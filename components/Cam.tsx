import { ReactNode } from "react";
import { useCam } from "../hooks/useCam";

interface CamProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function Cam({children, permissions, roles}: CamProps) {
  //validação
  const userCamSeeComponents = useCam({ permissions, roles })
  
  if(!userCamSeeComponents) {
    
    return null;
  }

  return (
    <>
      { children }
    </>
  )
}