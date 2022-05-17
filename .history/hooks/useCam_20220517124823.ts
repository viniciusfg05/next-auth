import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface UsecamParms {
  permissions?: string[];
  roles?: string[];
}

export function useCam({permissions, roles}: UsecamParms) {
  const { user, isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return false;
  }

  if(permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permissions => {
      //every retorna true caso todas as permissions estiverem satisfeitas 

      return user.permissions.includes(permissions)
    })

    if(!hasAllPermissions) {
      return false;
    }
  }

  if(roles?.length > 0) {
    const hasAllRoles = permissions.some(roles => {
      //some retorna true se pelo menos um existir

      return user.roles.includes(roles)
    })

    if(!hasAllRoles) {
      return false;
    }
  }

  return true // se passar de todos os ifs, ai sim ele tem permissão
}