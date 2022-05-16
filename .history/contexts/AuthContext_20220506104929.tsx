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
    const response = await api.post('sessions', {
      email,
      password
    })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      { children }
    </AuthContext.Provider>
  )
}