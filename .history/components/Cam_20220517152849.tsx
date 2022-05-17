import { ReactNode } from "react";

interface CamProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function Cam({children, permissions, roles}: CamProps) {
  return (
    <>
      { children }
    </>
  )
}