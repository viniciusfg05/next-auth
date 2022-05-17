interface User {
    permissions: string[];
    roles: string[];
}

interface validateUserPermicionsProps {
    user: User;
    permissions?: string[];
    roles?: string[];
}

export function validateUserPermicions({user, permissions, roles}: validateUserPermicionsProps) {
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
        const hasAllRoles = roles.some(roles => {
          //some retorna true se pelo menos um existir
    
          return user.roles.includes(roles)
        })
    
        if(!hasAllRoles) {
          return false;
        }

        return true;
    }
}