"use client";
import React, { useState } from "react";
import styles from "./register-user.module.css";
import RegisterUserForm from "../components/register-user-form/register-user-form";
import VerificationForm from "../components/verification-form/verification-form";
import UseRegisterUserService from "../services/register-user-services";
import { VerifyRegistrationResponse } from "@/interfaces/authentication";

/**
 * RegisterUser Component
 *
 * This component manages the user registration process, switching between
 * the registration form and the verification form based on the registration status.
 *
 * @component
 * @returns {JSX.Element} The rendered registration process UI.
 */
const RegisterUser: React.FC = () => {
  /**
   * State to track if the registration is successful.
   */
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState<boolean>(false);

  /**
   * State to store the user's email address after successful registration.
   */
  const [email, setEmail] = useState("");
  const [otpError,setOtpError] = useState<string | undefined>(undefined);

  const handleVerification = async(otp:string) =>{
     try{
      const response:VerifyRegistrationResponse = await UseRegisterUserService().verifyRegistration(otp);
      if(response.status === true){
        setOtpError(undefined);
        // route to additional details
      }else if(response.status === "error"){
        setOtpError(response.message);
      }
      console.log(response);
     }catch(error){
      console.error(error)
     }
  }

  return (
    <div className={styles.registerUserWrapper}>
      {/* Show registration form if not successful, else show verification form */}
      {!isRegistrationSuccessful ? (
        <RegisterUserForm
          setRegistrationSuccessfull={setIsRegistrationSuccessful}
          setUserEmail={setEmail}
        />
      ) : (
        <VerificationForm email={email} onClick={handleVerification} error={otpError}/>
      )}
    </div>
  );
};

export default RegisterUser;
