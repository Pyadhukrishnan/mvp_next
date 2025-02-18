/**
 * @file Denied.tsx
 * @description This component displays a message informing the user that their service application has been denied,
 * along with a button to return to the top of the page or other desired action.
 * 
 * @component
 * @example
 * // Usage Example
 * <Denied />
 * 
 * @dependencies
 * - `ButtonComponent` (Reusable button component for user interactions)
 * - `styles` (CSS module for styling)
 * 
 * @exports Denied
 */
import React from 'react';
import styles from './denied.module.css';
import ButtonComponent from '@/themes/components/button-component/button-component';

/**
 * @function Denied
 * @description A functional React component that displays a denial message, explaining the next steps for the user,
 * and provides a button to go back to the top of the page or perform other actions.
 * 
 * @returns {JSX.Element} A JSX element rendering the denial message and the button.
 * 
 * @example
 * <Denied />
 */
const Denied = () => {
  return (
    <div className={styles.deniedWrapper}>
        {/* Logo Image */}
        <img src="/icons/logo.svg" alt="Logo" className={styles.logo} />

        {/* Header and Description */}
        <div className={styles.headerDescription}>
          <h2>おまたせいたしました</h2> {/* Main header */}
          <p>
            詳細については、アカウント登録申請時にご入力いただいたメールアドレス宛にお送りしています。<br />
            内容をご確認の上、再度申請をお試しください。
            {/* Denial message with further instructions */}
          </p>
        </div>

        {/* Button to return to the top */}
        <ButtonComponent label="トップに戻る" onClick={()=>{}} />
    </div>
  )
}

export default Denied;
