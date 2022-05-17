import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { setapApiClient } from "../services/api"
import { api } from "../services/apiClient"
import { AuthTokenError } from "../services/errors/AuthTokenError"
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
  const apiClient = setapApiClient(ctx);
  
  try {
    const response = await apiClient.get('/me');
  } catch (err) {
    console.log(err instanceof AuthTokenError)
  }


  return {
    props: {}
  }
})
