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
  const isAuthenticated = false;

  function signIn({ email, password }: SingInCredentials) {
    console.log(email, password)
  }

  return (
    <AuthContext.Provider>
      { children }
    </AuthContext.Provider>
  )
}