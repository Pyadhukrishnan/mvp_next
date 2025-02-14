"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import LoginForm from "../components/login-form/login-form";
import ResetForm from "../components/reset-form/reset-form";
import VerificationForm from "@/modules/register-user/components/verification-form/verification-form";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoginCompleted, setIsLoginCompleted] = useState<boolean>(false);
  const [email,setEmail] = useState("");

  const handleVerification = () =>{
         // Prevents page reload on form submission
    }

  return (
    <div className={styles.loginPageWrapper}>
      {/* Conditional rendering of login or password reset form */}
      {showLogin ? (
        !isLoginCompleted ? (
          <LoginForm setShowLogin={setShowLogin} setIsLoginCompleted={setIsLoginCompleted} setLoginEmail={setEmail}/>
        ) : (
          <VerificationForm email="" onClick={handleVerification}/>
        )
      ) : (
        <ResetForm setLoginToggle={setShowLogin} />
      )}
    </div>
  );
};

export default Login;
