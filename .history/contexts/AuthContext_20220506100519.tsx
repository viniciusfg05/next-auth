import { createContext } from "react";

//data a serem salvo
interface SingInCredentials {
  email: string;
  password: string
}
interface AuthContextData {
  signIn(credentials: SingInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }) {

  return (
    <AuthContext.Provider value=({  })>
      { children }
    </AuthContext.Provider>
  )
}