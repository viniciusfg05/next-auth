import Router from "next/router";
import { createContext, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { setapApiClient } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "../services/apiClient";

//data a serem salvo
interface SingInCredentials {
  email: string;
  password: string
}

interface  User {
  email: string;
  permissions: string[];
  roles: string[];
}

interface AuthContextData {
  signIn: (credentials: SingInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function signOut() {
  destroyCookie(undefined, "nextauth.token" )
  destroyCookie(undefined, "nextauth.refreshToken" )

  authChannel.postMessage('signOut')

  Router.push('/')
}


export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel 

export function AuthProvider({ children }: AuthProviderProps) {
  //salvar os dados do usuario
  const [user, setUser] = useState<User>()
  const isAuthenticated = !! user; // se tiver vazio vai ser false se tiver dado retorna vdd

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut': signOut()
          break;
        default:
          break;
      }
    }
  }, [])

  //Revalida os dados quando acessado novamento
  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if(token) {
      api.get('/me').then(res => {
        const {email, permissions, roles} = res.data

        setUser({ email, permissions, roles })
      })
      .catch(() => {
        if(process.browser) {
          //variavel global true e false, diz se a função ta sendo executada no browser ou não 
          signOut();
        }
      })
    }
  }, [])

  

  async function signIn({ email, password }: SingInCredentials) {
    try {
      //chmanda de autenticação
      const response = await api.post('sessions', {
        email,
        password
      })
      
      const { token, refreshToken, permissions, roles } = response.data 

      setCookie( undefined, 'nextauth.token', token, {
        maxAge: 60 * 25 * 30, // 30 dias  //tempo que eu quero guardar o dado
        path: '/', //qual endereço vai ter acesso, ('/' todos os site vai ter acesso )
      }) //1° - contexto da req (undefined) sempre que a acão é pelo lado do browser e SSG, 2° nome do cookie, 3° valor do token, 4° informações add

      setCookie( undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 25 * 30, // 30 dias  //tempo que eu quero guardar o dado
        path: '/', //qual endereço vai ter acesso, ('/' todos os site vai ter acesso )
      })

      setUser({
        email,
        permissions,
        roles
      })

      //atualiza o token de Authorization do header
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')

      authChannel.postMessage('signIn')
    } catch (err){
      console.log(err),
      console.log("error")
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      { children }
    </AuthContext.Provider>
  )
}