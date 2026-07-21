import type { SetStateAction } from "react";

export interface AuthStates {
  loggedInUser: UserInfo | null;
  setLoggedInUser: React.Dispatch<SetStateAction<UserInfo|null>>;
}
export interface User {
firstName:string,
lastName:string,
email:string,
password:string
}
export interface UserInfo{
  firstName:string,
  lastName:string,
  email:string
}
