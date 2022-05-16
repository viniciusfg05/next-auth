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
api.interceptors.response.use(res => {
  return res;
}, (error: AxiosError) => {

}) // 1° Oq fazer se a resposta der sucesso (no caso nao vamos fazer nada vamos apenas retorna-lá ) 2° oq eu quero fazer se der errado