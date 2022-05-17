import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { validateUserPermicions } from "../utils/validateUserPermicions";

interface UsecamParms {
  permissions?: string[];
  roles?: string[];
}

export function useCam({permissions, roles}: UsecamParms) {
  const { user, isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermicions({
    user,
    permissions,
    roles
  })

  return userHasValidPermissions // se passar de todos os ifs, ai sim ele tem permissão
}