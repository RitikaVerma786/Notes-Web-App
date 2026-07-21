import api from './api.ts';

import type{ User } from '../types/authTypes.tsx';
const signupApi = (data:User)=>{
    console.log(data)
   return  api.post('/auth/signup',data);
}

const loginApi = (data:{email:string,password:string})=>{
    return api.post('/auth/login',data);
}
export { signupApi, loginApi};