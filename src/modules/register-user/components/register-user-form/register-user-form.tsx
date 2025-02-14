"use client";
import React, { useEffect, useState } from "react";
import styles from "./register-user-form.module.css";
import InputField from "@/themes/components/input-field/input-field";
import ButtonComponent from "@/themes/components/button-component/button-component";
import CheckboxInput from "@/themes/components/checkbox-input/checkbox-input";
import UseRegisterUserService from "../../services/register-user-services";
import { validatePasswordsMatch } from "@/utils/validation-utils";

/**
 * Props interface for RegisterUserForm component.
 */
interface RegistrationFormProps {
  setRegistrationSuccessfull: (status: boolean) => void;
  setUserEmail: (value: string) => void;
}

/**
 * RegisterUserForm Component - Handles user registration form functionality.
 * 
 * @param {RegistrationFormProps} props - Component props.
 * @returns {JSX.Element} - The rendered component.
 */
const RegisterUserForm: React.FC<RegistrationFormProps> = ({
  setRegistrationSuccessfull,
  setUserEmail
}) => {
  // State variables for user input fields
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State variables for error messages
  const [emailError, setEmailError] = useState<string | undefined>("");
  const [newPasswordError, setNewPasswordError] = useState<string | undefined>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>("");
  const [termsError, setTermsError] = useState<boolean>(false);
  
  // State variable for checkbox selection
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);

  /**
   * Handles form submission.
   * 
   * @param {React.FormEvent<HTMLFormElement>} event - Form submission event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents page reload on form submission
    
    if (!termsAgreed) {
      setTermsError(true);
      return;
    }

    if (!validatePasswordsMatch(newPassword, confirmPassword)) {
      return;
    }

    const response = await UseRegisterUserService().registerUser(
      email,
      newPassword,
      confirmPassword
    );

    setEmailError(response.errors.emailError);
    setNewPasswordError(response.errors.passwordError);

    if (response.status) {
      setRegistrationSuccessfull(true);
      setUserEmail(email);
    }
  };

  // Resets terms agreement error when terms checkbox is toggled
  useEffect(() => {
    setTermsError(false);
  }, [termsAgreed]);

  // Validates password match and sets error message
  useEffect(() => {
    if (!validatePasswordsMatch(newPassword, confirmPassword)) {
      setConfirmPasswordError("パスワードが一致していません");
    } else {
      setConfirmPasswordError("");
    }
  }, [confirmPassword,newPassword]);

  // Clears email and password error messages when values change
  useEffect(() => {
    setEmailError(undefined);
    setNewPasswordError(undefined);
  }, [email, newPassword, confirmPassword]);

  return (
    <form className={styles.registerUserForm} onSubmit={handleSubmit}>
      <h2 className={styles.header}>新規登録</h2>

      <div className={styles.formFields}>
        <div className={styles.inputFields}>
          {/* Email Input Field */}
          <div className={styles.inputField}>
            <p>メールアドレスまたはユーザー名</p>
            <InputField
              value={email}
              onChange={setEmail}
              errorStatus={!!emailError}
            />
            {emailError && <p className={styles.errorMessage}>{emailError}</p>}
          </div>
          
          {/* New Password Input Field */}
          <div className={styles.inputField}>
            <p>パスワード</p>
            <InputField
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              errorStatus={!!newPasswordError}
            />
            <p>・半角大文字, 小文字, 数字を含めた12文字以上20桁以内</p>
            {newPasswordError && <p className={styles.errorMessage}>{newPasswordError}</p>}
          </div>

          {/* Confirm Password Input Field */}
          <div className={styles.inputField}>
            <p>パスワード</p>
            <InputField
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              errorStatus={!!confirmPasswordError}
            />
            {confirmPasswordError && <p className={styles.errorMessage}>{confirmPasswordError}</p>}
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <CheckboxInput
          label="新規登録することにより、当社の利用規約とプライバシーポリシーに同意したとみなされます。"
          error={termsError}
          onSelect={setTermsAgreed}
        />

        {/* Submit Button */}
        <ButtonComponent label="新規登録" onClick={() => handleSubmit} />
      </div>
    </form>
  );
};

export default RegisterUserForm;
