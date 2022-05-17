import { useContext, useEffect } from "react"
import { Cam } from "../components/Cam"
import { AuthContext } from "../contexts/AuthContext"
import { useCam } from "../hooks/useCam"
import { setapApiClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Metrics() {
  return (
    <>
      <h1>metrics</h1>
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
