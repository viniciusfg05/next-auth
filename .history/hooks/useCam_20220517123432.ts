import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface UsecamParms {
  permissions?: string[];
  roles?: string[];
}

export function useCam({permissions, roles}: UsecamParms) {
  const { user, isAuthenticated } = useContext(AuthContext)
}