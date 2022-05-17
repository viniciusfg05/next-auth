import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/api"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me').then(res => console.log(res))
  }, [] ) 

  return (
    <h1>dashboard: {user?.email} </h1>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const response = await api.get('/me')

  console.log(response.statusText)

  return {
    props: {}
  }
})
