

import { createContext,useContext,useState, type PropsWithChildren } from "react"

import type {AuthStates,UserInfo} from '../types/authTypes';
const AuthContext = createContext<AuthStates | null>(null);
export const AuthContextProvider = ({children}:PropsWithChildren) => {
  
    const [loggedInUser,setLoggedInUser] = useState<UserInfo | null>(null);


  return (
    <AuthContext.Provider value={{loggedInUser,setLoggedInUser}}>
        {children}
    </AuthContext.Provider>
  )

}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be inside AuthProvider');
    return context;
}

