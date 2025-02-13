import React, { useRef, useState } from 'react';
import styles from './otp-input.module.css';


interface OtpInputProps{
    length:number;
    onChange:(value:string) =>void;
}

const OtpInput:React.FC<OtpInputProps> = ({length=6,onChange}) => {
    // State to store OTP values in an array
  const [otp, setOtp] = useState(new Array(length).fill(""));
  
  // Reference for input elements to handle auto focus
  const inputRefs = useRef<(HTMLInputElement | undefined | null)[]>([]);



  /**
   * Handles input change event for OTP fields.
   * 
   * @param {number} index - Index of the OTP input field.
   * @param {Event} event - Input change event.
   */
  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isNaN(Number(value))) return; // Ensure only numbers are entered

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Store only last digit
    setOtp(newOtp);

    // Move to next input if available
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onChange(newOtp.join(""));
    }
  };

  /**
   * Handles backspace key event for OTP fields.
   * 
   * @param {number} index - Index of the OTP input field.
   * @param {KeyboardEvent} event - Key event.
   */
  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <div className={styles.otpContainer}>
      {otp.map((digit, index) => (
        <input
        key={index}
        type="text"
        maxLength={1}
        value={digit}
        ref={(el) => {
          inputRefs.current[index] = el;
        }}
        onChange={(e) => handleChange(index, e)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className={styles.otpInput}
      />
      ))}
    </div>
  )
}

export default OtpInput