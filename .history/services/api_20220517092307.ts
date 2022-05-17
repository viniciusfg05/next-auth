import axios, { AxiosError } from "axios";
import { request } from "https";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/AuthContext";


let isRefreshing = false;
let failedRequestsQueue = [] //salva as req que falharem para serem executadas novamente após o refresh

export function setapApiClient(ctx) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:5555',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  })
  
  //Função do axios para interceptar req/res
  api.interceptors.response.use(response => {
    return response;
  }, (error) => {
    if(error.response.status === 401) {
      if(error.response.data?.code === 'token.expired') {
        //renovar token
        cookies = parseCookies(ctx); //recupera o token do cooki e
  
        const { 'nextauth.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config// todas a configuração do backend - rota que chame, quais paramentro, callback, oq deveria acontecer apos a req ser feita e tudo mais 
  
        //se ainda não estive executando o refresh token não estiver
        if(!isRefreshing) {
          isRefreshing = true
  
          api.post('/refresh', {
            refreshToken,
          }).then(response => {
            const { token } = response.data; //novo token
    
            setCookie( ctx, 'nextauth.token', token, {
              maxAge: 60 * 25 * 30, // 30 dias  //tempo que eu quero guardar o dado
              path: '/', //qual endereço vai ter acesso, ('/' todos os site vai ter acesso )
            }) //1° - contexto da req (undefined) sempre que a acão é pelo lado do browser e SSG, 2° nome do cookie, 3° valor do token, 4° informações add
            
            setCookie( ctx, 'nextauth.refreshToken', response.data.refreshToken, {
             maxAge: 60 * 25 * 30, // 30 dias  //tempo que eu quero guardar o dado
             path: '/', //qual endereço vai ter acesso, ('/' todos os site vai ter acesso )
            })
  
            //atualiza o token de Authorization do header
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
           
            //Ao finalizar o refreshToken vamos pegar cadas req e executar novamente usando a função onSucess e pasando o token atualizado
            failedRequestsQueue.forEach(request => request.onSuccess(token))
            failedRequestsQueue = [] // limpa a lista de requeste 
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFaled(err))
            failedRequestsQueue = [] // limpa a lista de requeste 
  
            if(typeof window !== 'undefined') {
              //variavel global true e false, diz se a função ta sendo executada no browser ou não 
              signOut();
            }
  
          }).finally(() => {
            isRefreshing = false
          })
        }
  
        return new Promise(( resolve, reject ) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => { //novo token
              originalConfig.headers['Authorization'] = `Bearer ${token}`; //troca o autorization pelo novo token
  
              resolve(api(originalConfig)) // chamando a api novamente e passando as config onde tem os parametro para executar novamente e está dentro de resolve pq no axios é a unica forna de torna la assicrono
            },//oq vai acontecer quando o refresh token tiver finalizado
            onFaled: (err: AxiosError) => {
              reject(err)
            }//oq fazer se o refreshToken tenha dado errado
          })
        })
      } else {
        //deslogar
        if(typeof window !== 'undefined') {
          //variavel global true e false, diz se a função ta sendo executada no browser ou não 
          signOut();
        }
      }
    }
  
    return Promise.reject(error);
  }) // 1° Oq fazer se a resposta der sucesso (no caso nao vamos fazer nada vamos apenas retorna-lá ) 2° oq eu quero fazer se der errado
  
  return api;
}
