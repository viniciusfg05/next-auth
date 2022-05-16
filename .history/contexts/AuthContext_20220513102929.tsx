import { createContext, PropsWithChildren, ReactNode } from "react";
import { api } from "../services/api";

//data a serem salvo
interface SingInCredentials {
  email: string;
  password: string
}
interface AuthContextData {
  signIn(credentials: SingInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SingInCredentials) {

      api.post('/sessions')
      .catch(function (error) {
        if (error.response) {
          console.log(JSON.stringify(error));
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      { children }
    </AuthContext.Provider>
  )
}