"use client";
import React, { useState } from "react";
import styles from "./register-user.module.css";
import RegisterUserForm from "../components/register-user-form/register-user-form";
import VerificationForm from "../components/verification-form/verification-form";

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

  return (
    <div className={styles.registerUserWrapper}>
      {/* Show registration form if not successful, else show verification form */}
      {!isRegistrationSuccessful ? (
        <RegisterUserForm
          setRegistrationSuccessfull={setIsRegistrationSuccessful}
          setUserEmail={setEmail}
        />
      ) : (
        <VerificationForm email={email} />
      )}
    </div>
  );
};

export default RegisterUser;
