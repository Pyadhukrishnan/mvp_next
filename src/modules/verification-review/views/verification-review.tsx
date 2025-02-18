/**
 * @file VerificationReview.tsx
 * @description This component handles the display of the verification status message based on the URL parameter `status`.
 * It renders one of the following components based on the verification status:
 * - `Approved`: If the `status` is "approved"
 * - `Denied`: If the `status` is "denied"
 * - `UnderReview`: If the `status` is anything else
 * 
 * @component
 * @example
 * // Usage Example
 * <VerificationReview />
 * 
 * @dependencies
 * - `useSearchParams` (Next.js hook to access search parameters from the URL)
 * - `Approved`, `Denied`, `UnderReview` (Components representing different verification states)
 * - `styles` (CSS module for styling)
 * 
 * @exports VerificationReview
 */
"use client";

import React from "react";
import styles from "./verification-review.module.css";
import { useSearchParams } from "next/navigation";
import Approved from "../components/approved/approved";
import Denied from "../components/denied/denied";
import UnderReview from "../components/under-review/under-review";

/**
 * @function VerificationReview
 * @description A functional React component that conditionally renders the verification result message
 * based on the `status` URL query parameter. The component checks the `status` value and displays:
 * - `Approved` if the status is "approved"
 * - `Denied` if the status is "denied"
 * - `UnderReview` for all other statuses
 * 
 * @returns {JSX.Element} A JSX element displaying the relevant verification status.
 * 
 * @example
 * <VerificationReview />
 */
const VeificationReview = () => {
  // Using useSearchParams hook to get the URL query parameters
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className={styles.verificationWrapper}>
      {/* Conditionally render the status component based on `status` query parameter */}
      {status === "approved" ? (
        <Approved />  // Show Approved message if status is "approved"
      ) : status === "denied" ? (
        <Denied />   // Show Denied message if status is "denied"
      ) : (
        <UnderReview />  // Show UnderReview message for all other statuses
      )}
    </div>
  );
};

export default VeificationReview;
