import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:5555'
  headers: {
    Authorization: `Bearer ${cookies, ['nextauth.token']}`
  }
})