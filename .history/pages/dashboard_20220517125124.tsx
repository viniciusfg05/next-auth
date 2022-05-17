import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useCam } from "../hooks/useCam"
import { setapApiClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function dashboard() {
  const { user } = useContext(AuthContext)

  const userCamSeeMetrics = useCam({
    roles: ['metrics.list']
  })

  useEffect(() => {
    api.get('/me').then(res => console.log(res))
  }, [] ) 

  return (
    <>
      <h1>dashboard: {user?.email} </h1>

      { userCamSeeMetrics && <div>Metricas</div> }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setapApiClient(ctx);
  
  const response = await apiClient.get('/me');

  console.log(response.data)

  return {
    props: {}
  }
})
