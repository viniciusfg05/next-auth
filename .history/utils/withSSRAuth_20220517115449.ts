import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx) //como estamos pelo lado do servidor ao inves de passarmos undefined como passamos no nado do browser, vamos passar "ctx"

        if(!cookies['nextauth.token']) {
          return {
            redirect: {
              destination: '/',
              permanent: false, //não vai acontecer sempre  
            }
          }
        }

        try {
          return await fn(ctx) 
        } catch (err) {
          //se o erro for do tipo AuthTokenError = True, se não false
          destroyCookie(ctx, "nextauth.token")
          destroyCookie(ctx, "nextauth.refreshToken")
      
          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
        }
    }

}