/**
 * @file UnderReview.tsx
 * @description This component displays a message informing the user that their service application is under review.
 * It provides an indication of the expected time frame for the review process.
 * 
 * @component
 * @example
 * // Usage Example
 * <UnderReview />
 * 
 * @dependencies
 * - `ButtonComponent` (Reusable button component for future actions, if needed)
 * - `styles` (CSS module for styling)
 * 
 * @exports UnderReview
 */
import React from 'react';
import styles from './under-review.module.css';
/**
 * @function UnderReview
 * @description A functional React component that displays a message indicating that the service application is currently under review.
 * The component includes the expected time frame for the review process and provides visual cues for the user to wait.
 * 
 * @returns {JSX.Element} A JSX element rendering the under review message with additional details.
 * 
 * @example
 * <UnderReview />
 */
const UnderReview = () => {
  return (
    <div className={styles.underReviewWrapper}>
        {/* Logo Image */}
        <img src="/icons/logo.svg" alt="Logo" className={styles.logo} />

        {/* Header and Description */}
        <div className={styles.headerDescription}>
            <h2>ただいま審査中です...</h2> {/* Main header indicating review process */}
            <p>
                審査完了の目安：X日からX日程度 <br />
                審査が完了次第、XXXXでお知らせします。審査完了までしばらくお待ちください。
                {/* Message detailing the review time frame and notification when completed */}
            </p>
        </div>
    </div>
  )
}

export default UnderReview;
