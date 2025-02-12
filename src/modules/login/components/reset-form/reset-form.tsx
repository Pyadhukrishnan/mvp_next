/**
 * @file ResetPasswordForm.jsx
 * @description This component renders a reset password form with an option to navigate back to the login form.
 * 
 * @component
 * @param {Function} setLoginToggle - Function to toggle between the login form and reset password form.
 * 
 * @dependencies
 * - React (useState, useEffect)
 * - CSS Module (ResetPasswordForm.module.css)
 */

import React from "react";
import styles from './reset-form.module.css'

/**
 * @function ResetPasswordForm
 * @description Displays a reset password form with a back button to return to the login form.
 * @param {Object} props - Component properties.
 * @param {Function} props.setLoginToggle - Function to toggle login form visibility.
 * @returns {JSX.Element} The reset password form component.
 */


interface ResetFormProps{
    setLoginToggle:(value:boolean)=>void
}

const ResetForm:React.FC<ResetFormProps> = ({ setLoginToggle }) => {
  /**
   * @function handleLoginToggle
   * @description Calls `setLoginToggle` to navigate back to the login form.
   * @returns {void}
   */
  const handleLoginToggle = () => {
    setLoginToggle(true);
  };

  return (
    <div className={styles.resetPasswordForm}>
      {/* Reset Password Header */}
      <h2>Reset Password Form</h2>

      {/* Back Navigation Link */}
      <p onClick={handleLoginToggle} className={styles.backLink}>back</p>
    </div>
  );
};

export default ResetForm;
