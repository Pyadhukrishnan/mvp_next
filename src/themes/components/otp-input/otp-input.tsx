import React, { useRef, useState } from "react";
import styles from "./otp-input.module.css";

interface OtpInputProps {
  length: number;
  onChange: (value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
  // State to store OTP values in an array
  const [otp, setOtp] = useState(new Array(length).fill(""));

  // Reference for input elements to handle auto-focus
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /**
   * Handles input change event for OTP fields.
   *
   * @param {number} index - Index of the OTP input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - Input change event.
   */
  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) return; // Ensure only numbers are entered

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Store only last digit
    setOtp(newOtp);

    // Move to next input if available
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onChange when all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onChange(newOtp.join(""));
    }
  };

  /**
   * Handles backspace key event for OTP fields.
   *
   * @param {number} index - Index of the OTP input field.
   * @param {React.KeyboardEvent<HTMLInputElement>} event - Key event.
   */
  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault(); // Prevent default backspace behavior

      const newOtp = [...otp];

      if (otp[index]) {
        // If current field has a value, clear it
        newOtp[index] = "";
      } else if (index > 0) {
        // Move to the previous input and clear it
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }

      setOtp(newOtp);
      onChange(newOtp.join(""));
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
            inputRefs.current[index] = el; // Store reference properly
          }}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={styles.otpInput}
        />
      ))}
    </div>
  );
};

export default OtpInput;
