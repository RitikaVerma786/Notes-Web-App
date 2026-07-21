import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token:string)=>{
    try{
        const decoded:any = jwtDecode(token);
        const currentTime = Date.now()/1000;
        return  decoded.exp < currentTime;
    }catch(err){
        return true;
    }
}
