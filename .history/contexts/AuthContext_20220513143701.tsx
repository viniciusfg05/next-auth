import Router from "next/router";
import { createContext, PropsWithChildren, ReactNode, useState } from "react";
import { api } from "../services/api";

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
  signIn(credentials: SingInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  //salvar os dados do usuario
  const [user, setUser] = useState<User>()
  const isAuthenticated = false;

  async function signIn({ email, password }: SingInCredentials) {
    try {
      //chmanda de autenticação
      const response = await api.post('sessions', {
        email,
        password
      })
      
      const {permissions, roles} = response.data 

      setUser({
        email,
        permissions,
        roles
      })

      Router.push('/dashboard')
      console.log(response.data)

    } catch (err){
      console.log(err),
      console.log("error")
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      { children }
    </AuthContext.Provider>
  )
}