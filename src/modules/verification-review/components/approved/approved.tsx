/**
 * @file Approved.tsx
 * @description This component renders a success message and a button for users to proceed with login after their service application is approved.
 * 
 * @component
 * @example
 * // Usage Example
 * <Approved />
 * 
 * @dependencies
 * - `ButtonComponent` (Reusable button component for user interactions)
 * - `styles` (CSS module for styling)
 * 
 * @exports Approved
 */
import React from 'react';
import styles from './approved.module.css';
import ButtonComponent from '@/themes/components/button-component/button-component';

/**
 * @function Approved
 * @description A functional React component that displays an approval message and a button to proceed to the login page.
 * It shows a success message when a user's service application is approved.
 * 
 * @returns {JSX.Element} A JSX element rendering the approval message and login button.
 * 
 * @example
 * <Approved />
 */
const Approved = () => {
  return (
    <div className={styles.approvedWrapper}>
        {/* Logo Image */}
        <img src="/icons/logo.svg" alt="Logo" className={styles.logo} />
        
        {/* Header Description */}
        <h2 className={styles.headerDescription}>
          おまたせいたしました <br />
          サービス利用申し込みが承認されました
        </h2>

        {/* Button to proceed to login */}
        <ButtonComponent label="ログインに進む" onClick={()=>{}}/>
    </div>
  )
}

export default Approved;
