import React, { useState } from 'react';
import styles from './input-field.module.css';

interface InputFieldProps{
  theme?:string;
  type?:string;
  onChange:(value:string)=>void;
  value:string;
  errorStatus?:boolean;
}

const InputField:React.FC<InputFieldProps> = ({
  theme="default",
  type="text",
  onChange,
  value,
  errorStatus=false
}) => {
  // State to track password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // State to control input type (toggle between "password" and "text")
  const [inputType, setInputType] = useState(type);

  /**
   * @function togglePasswordVisibility
   * @description Toggles the visibility of the password field.
   */
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    setInputType((prev) => (prev === "text" ? "password" : "text"));
  };

  /**
   * @function setTheme
   * @description Returns the appropriate CSS class based on the theme.
   * @param {string} theme - The selected theme.
   * @returns {string} The corresponding CSS class.
   */
  const setTheme = (theme:string) => {
    switch (theme) {
      case "error":
        return styles.error;
      default:
        return styles.default;
    }
  };

  /**
   * @function textChange
   * @description Handles input value changes and triggers the onChange function.
   * @param {Event} e - The input change event.
   */
  const textChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={`${styles.default} ${setTheme(theme)} ${errorStatus?styles.error:null}`}>
      <input 
        className={styles.inputField} 
        type={inputType} 
        onChange={textChange} 
        value={value} 
      />
      
      {/* Show password toggle button only if input type is "password" */}
      {type === "password" && (
        <button 
          type="button" 
          className={styles.toggleButton} 
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? "非表示" : "表示"}
        </button>
      )}
    </div>
  )
}

export default InputField