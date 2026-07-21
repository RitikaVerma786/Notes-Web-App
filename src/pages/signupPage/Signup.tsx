import React, { useRef, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants/Constants";
import openEyeImg from "../../assets/eye.png";
import closeEyeImg from "../../assets/closed-eyes.png";
import { signupApi } from "../../apis/authApi";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Signup.module.css";

const Signup = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setshowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const passwordInput = useRef<HTMLInputElement | null>(null);

  const onclickShowPass = () => {
    setshowPass((prev) => !prev);
  };

  const onclickShowConfirmPass = () => {
    setshowConfirmPass((prev) => !prev);
  };

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const postUser = async () => {
    try {
      const { confirmPassword, ...signupData } = user;
      const res = await signupApi(signupData);
      if (res.status === 200) {
        toast.success("Signup Successful!");
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.log(err.response?.data);
    }
  };

  const onsubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim() || !user.password) {
      toast.error("All fields are required");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    postUser();
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onsubmitHandler}>
        <h1>Create a new account</h1>
        <div className={styles.inputContainer}>

          <div className={styles.inputField}>
            <input
              type="text"
              placeholder="First Name..."
              name="firstName"
              onChange={onchangeHandler}
              value={user.firstName}
            />
          </div>
          <div className={styles.inputField}>
            <input
              type="text"
              placeholder="Last Name..."
              name="lastName"
              onChange={onchangeHandler}
              value={user.lastName}
            />
          </div>

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
              ref={passwordInput}
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

          <div className={styles.inputField}>
            <input
              type={showConfirmPass ? 'text' : 'password'}
              placeholder="Confirm Password..."
              name="confirmPassword"
              onChange={onchangeHandler}
              value={user.confirmPassword}
            />
            {showConfirmPass ? (
              <img
                src={openEyeImg}
                alt="openEyeImg"
                height={30}
                width={30}
                onClick={onclickShowConfirmPass}
              />
            ) : (
              <img
                src={closeEyeImg}
                alt="openEyeImg"
                height={30}
                width={30}
                onClick={onclickShowConfirmPass}
              />
            )}
          </div>

          <button type="submit">Sign Up</button>
          <p style={{ textAlign: "center" }}>
            Already have an account ? <NavLink to="/login" style={{ textDecoration: "none" }}>Login</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Signup;

