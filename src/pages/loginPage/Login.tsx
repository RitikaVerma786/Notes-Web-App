import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginApi } from "../../apis/authApi";

import openEyeImg from "../../assets/eye.png";
import closeEyeImg from "../../assets/closed-eyes.png";
import styles from "../loginPage/Login.module.css";
import { useNotesContext } from "../../contexts/NotesContext";
import { useAuth } from "../../contexts/AuthContext";

interface User{
  email:string,
  password:string
}

const Login = () => {
  const {setNotes,notes} = useNotesContext();
  const {setLoggedInUser}  = useAuth();
    const [showPass, setshowPass] = useState(false);
  
  console.log("notes",notes)
  const navigate = useNavigate();
 
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const onclickShowPass = () => {
    setshowPass((prev) => !prev);
  };

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const postUser = async () => {
    try {
      const res = await loginApi(user);
      console.log(res);
      if (res.status == 200) {
        const token = res.data?.token;
        setLoggedInUser(res.data?.userInfo);
        localStorage.setItem("token", token);
        toast.success("Login Successfull")
        navigate("/dashboard");
         setNotes([]);
          
      }
    } catch (err:any) {
      toast.error(err.response.data.message )
      console.log("login failed...", err);
    }
  };

  const onsubmitHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (user.email === "" && user.password === "") {
      return;
    }
    console.log("inside login submit handler..");
    postUser();
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onsubmitHandler}>
        <h1>Log In</h1>
        <div className={styles.inputContainer}>
            <div className={styles.inputField}>
            <input
              type="email"
              placeholder="Email..."
              name="email"
              onChange={onchangeHandler}
              value={user.email}
            />
          </div>

          <div className={styles.inputField}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password..."
              name="password"
              onChange={onchangeHandler}
              value={user.password}
            />
            {showPass ? (
              <img
                src={openEyeImg}
                alt="openEyeImg"
                height={30}
                width={30}
                onClick={onclickShowPass}
              />
            ) : (
              <img
                src={closeEyeImg}
                alt="openEyeImg"
                height={30}
                width={30}
                onClick={onclickShowPass}
              />
            )}
          </div>
          <button type="submit">Login</button>
          <p style={{textAlign:"center"}}>Create new account ? <NavLink to='/' style={{textDecoration:"none"}}>SignUp</NavLink> </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
