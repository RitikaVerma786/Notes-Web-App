import api from "./api";

const userInfoReq = ()=>{
    const token = localStorage.getItem('token');
    return api.get('/user',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const postUserProfileReq = (formData:FormData)=>{
  const token = localStorage.getItem('token');
  return api.post('/user/profile',formData,{
        headers: {
           "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  })
} 

const updateUserInfoReq = (data: { firstName: string; lastName: string; email: string }) => {
  const token = localStorage.getItem('token');
  return api.put('/user/update', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const changePasswordReq = (data: any) => {
  const token = localStorage.getItem('token');
  return api.put('/user/change-password', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { userInfoReq, postUserProfileReq, updateUserInfoReq, changePasswordReq };