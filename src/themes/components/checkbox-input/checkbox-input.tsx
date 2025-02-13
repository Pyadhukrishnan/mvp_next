"use client";
import React, { useState } from "react";
import styles from "./checkbox-input.module.css";

/**
 * CheckboxInput Component
 *
 * A reusable checkbox component that allows users to select or deselect an option.
 * This component supports error handling and notifies the parent component about selection changes.
 *
 * @component
 * @param {string} label - The label text displayed next to the checkbox.
 * @param {(value: boolean) => void} onSelect - Callback function triggered when the checkbox state changes.
 * @param {boolean} [error] - Optional prop to indicate an error state.
 * @returns {JSX.Element} The rendered checkbox component.
 */
interface CheckboxInputProps {
  label: string;
  onSelect: (value: boolean) => void;
  error?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, onSelect, error }) => {
  /**
   * State to manage the checkbox's checked status.
   */
  const [checked, setChecked] = useState(false);

  /**
   * Handles the checkbox state change.
   * Updates the internal state and notifies the parent component.
   */
  const handleChange = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onSelect(newCheckedState); // Notify parent component
  };

  return (
    <div className={styles.checkBoxInputWrapper}>
      <label className={styles.checkboxLabel}>
        {/* Native checkbox input (hidden with custom styling) */}
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={styles.checkboxInput}
        />
        
        {/* Custom-styled checkbox */}
        <span className={`${styles.customCheckbox} ${error ? styles.error : ""}`}>
          {checked && (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.tickIcon}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </span>

        {/* Checkbox label */}
        <p>{label}</p>
      </label>
    </div>
  );
};

export default CheckboxInput;
