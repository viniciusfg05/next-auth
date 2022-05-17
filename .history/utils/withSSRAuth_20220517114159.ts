import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

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
        
        return await fn(ctx) 
    }

}