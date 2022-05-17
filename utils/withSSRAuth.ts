import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import decode from 'jwt-decode'
import { validateUserPermicions } from "./validateUserPermicions";

interface withSSRAuthOptions {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: withSSRAuthOptions) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx) //como estamos pelo lado do servidor ao inves de passarmos undefined como passamos no nado do browser, vamos passar "ctx"
        const token = cookies['nextauth.token']

        if(!token) {
          return {
            redirect: {
              destination: '/',
              permanent: false, //não vai acontecer sempre  
            }
          }
        }
        
        if(options) {
          //vamos executar a validação somente se options tiver informações das permissions
          const user = decode<{ permissions: string[], roles: string[]}>(token)
          const { permissions, roles } = options
          
          const userHasValidPermissions = validateUserPermicions({
            user,
            permissions,
            roles
          })

          if(!userHasValidPermissions) {
            return {
              redirect: {
                destination: "/dashboard",
                permanent: false
              }
            }
          }
        }



        try {
          return await fn(ctx) 
        } catch (err) {
          if(err instanceof AuthTokenError) {
            //se o erro for do tipo AuthTokenError = True, se não false
            destroyCookie(ctx, "nextauth.token")
            destroyCookie(ctx, "nextauth.refreshToken")
            
            return {
              redirect: {
                destination: `/`,
                permanent: false,
              },
            };
          }
        
          return {
            redirect: {
              destination: `/`,
              permanent: false,
            },
          }
        }
    }

}