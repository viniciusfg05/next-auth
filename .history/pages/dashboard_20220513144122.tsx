import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function dashboard() {
  const { user } = useContext(AuthContext)

  return (
    <h1>dashboard: {user?.email} </h1>
  )
}