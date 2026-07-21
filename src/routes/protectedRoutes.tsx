import { useEffect } from "react";
import { Navigate,Outlet, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utilities/utility";
 
 export const ProtectedRoutes = () => {
  const navigate = useNavigate(); 
  useEffect(()=>{
    if(!isTokenExpired){
      localStorage.removeItem('token');
      navigate('/login');
    }
  },[]);
  const token = localStorage.getItem('token');
  return token ? <Outlet/> : <Navigate to='/'/>; 
}                                                                                                                                                                                                                                           

