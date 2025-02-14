import React, { useEffect, useState } from "react";
import styles from "./verification-form.module.css";
import { maskEmail } from "@/utils/masking-util";
import OtpInput from "@/themes/components/otp-input/otp-input";
import ButtonComponent from "@/themes/components/button-component/button-component";

/**
 * Props interface for the VerificationForm component.
 */
interface VerificationFormProps {
  /**
   * The email address to which the verification code is sent.
   */
  email: string;
  /**
   * onclick function to handle verification
   */
  onClick: (otpValue:string) => void;

  error:string | undefined;
}

/**
 * VerificationForm Component
 *
 * This component renders a verification form where users enter a 6-digit OTP
 * sent to their registered email address.
 *
 * @component
 * @param {VerificationFormProps} props - The component props.
 * @param {string} props.email - The user's email address for verification.
 * @param {function} props.onClick - The user's email address for verification.
 * @returns {JSX.Element} The rendered verification form.
 */
const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  onClick,
  error
}) => {
  /**
   * State for storing the OTP value entered by the user.
   */
  const [otpValue, setOtpValue] = useState("");

  return (
    <form
      className={styles.verificationFormWrapper}
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onClick(otpValue); // Call the function
      }}
    >
      {/* Header Section */}
      <div className={styles.header}>
        <h2>認証コードを入力してください</h2>
        <p>
          <span className={styles.email}>{maskEmail(email)}</span>{" "}
          宛にお送りした認証コードを入力してください。
        </p>
      </div>

      {/* OTP Input Field */}
      <OtpInput length={6} onChange={setOtpValue} />

      {error&&
      <p className={styles.error}>{error}</p>
      }

      {/* Buttons Section */}
      <div className={styles.buttons}>
        <ButtonComponent label="認証" onClick={()=>onClick(otpValue)} />
        <p className={styles.resendButton}>コードを再送信</p>
      </div>
    </form>
  );
};

export default VerificationForm;
