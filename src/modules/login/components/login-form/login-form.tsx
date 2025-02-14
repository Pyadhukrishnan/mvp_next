import React, { useEffect, useState } from "react";
import styles from "./login-form.module.css";
import ButtonComponent from "@/themes/components/button-component/button-component";
import InputField from "@/themes/components/input-field/input-field";
import UseLoginServices from "../../services/login-services";

interface LoginProps {
  setShowLogin: (value: boolean) => void;
  setIsLoginCompleted: (status: boolean) => void;
  setLoginEmail:(value:string)=>void;
}

const LoginForm: React.FC<LoginProps> = ({
  setShowLogin,
  setIsLoginCompleted,
  setLoginEmail
}) => {
  // State variables for email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [mainError, setMainError] = useState<string | undefined>(undefined);

  /**
   * @function handleSubmit
   * @description Handles form submission, validates input, and calls the login API.
   * @param {Event} event - The form submission event.
   * @returns {void}
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    // Call login service to authenticate user
    const response = await UseLoginServices().login(email, password);

    // Set error messages based on API response
    setEmailError(response.errors.emailError);
    setPasswordError(response.errors.passwordError);
    setMainError(response.errors.mainError);

    // If login is successful, set props to show verification component
    if (response.status) {
      setIsLoginCompleted(true);
    }
  };

  /**
   * @function handleToggleLoginShow
   * @description Closes the login form when the user clicks "Forgot Password".
   * @returns {void}
   */
  const handleToggleLoginShow = () => {
    setShowLogin(false);
    setLoginEmail(email);
  };

  /**
   * @effect Resets error messages when the email or password changes.
   */
  useEffect(() => {
    setEmailError(undefined);
    setPasswordError(undefined);
    setMainError(undefined);
  }, [email, password]);
  return (
    <form className={styles.loginFormWrapper} onSubmit={handleSubmit}>
      {/* Header */}
      <div className={styles.header}>ログイン</div>

      {/* Form content */}
      <div className={styles.formContent}>
        {/* Email Input */}
        <div className={styles.inputField}>
          <p>メールアドレスまたはユーザー名</p>
          <InputField
            value={email}
            onChange={setEmail}
            errorStatus={emailError ? true : false}
          />
          {emailError && <p className={styles.errorMessage}>{emailError}</p>}
        </div>

        {/* Password Input */}
        <div className={styles.inputField}>
          <div className={styles.inputLabels}>
            <p>パスワード</p>
            <p
              className={styles.forgotPasswordLink}
              onClick={handleToggleLoginShow}
            >
              パスワードを忘れた
            </p>
          </div>
          <InputField
            type="password"
            value={password}
            onChange={setPassword}
            errorStatus={passwordError || mainError ? true : false}
          />
          {passwordError && (
            <p className={styles.errorMessage}>{passwordError}</p>
          )}
        </div>

        {/* Login Button */}
        <ButtonComponent
          label={"ログイン"}
          onClick={() => {
            handleSubmit;
          }}
        />

        {/* Main Error Message */}
        {mainError && <p className={styles.errorMessage}>{mainError}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
