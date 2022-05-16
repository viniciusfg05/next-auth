import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:5555',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
})

//Função do axios para interceptar req/res
api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  console.log(error.response.data.code)
  if(error.response.status === 401) {
    if(error.response.data === 'token.expired') {
    }
  }
}) // 1° Oq fazer se a resposta der sucesso (no caso nao vamos fazer nada vamos apenas retorna-lá ) 2° oq eu quero fazer se der errado