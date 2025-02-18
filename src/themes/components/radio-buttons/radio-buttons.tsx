import React, { useState } from 'react';
import styles from './radio-buttons.module.css';
import { Options } from '@/interfaces/user';

/**
 * Props for the RadioButtons component
 */
interface RadioButtonsProps {
  /** Array of radio button options */
  options: Options[];

  /** Callback function to handle selection */
  onSelect: (value: string) => void;

  /** Optional error state to style the component */
  error?: boolean;
}

/**
 * RadioButtons Component
 *
 * This component renders a set of radio buttons based on the provided options.
 * It maintains the selected state internally and notifies the parent component
 * when a selection is made.
 *
 * @component
 * @param {Options[]} options - Array of radio button options (label and value)
 * @param {(value: string) => void} onSelect - Callback function triggered when a radio button is selected
 * @param {boolean} [error] - Optional boolean to apply error styling
 * @returns {JSX.Element} The rendered radio buttons component
 */
const RadioButtons: React.FC<RadioButtonsProps> = ({ options, onSelect, error }) => {
  // State to track the currently selected radio button value
  const [selectedValue, setSelectedValue] = useState<string>("");

  /**
   * Handles selection of a radio button.
   *
   * @param {string} value - The selected radio button value
   */
  const handleSelection = (value: string) => {
    setSelectedValue(value); // Update local state
    onSelect(value); // Notify parent component
  };

  return (
    <div className={styles.radiobuttonsWrapper}>
      {options.map((option) => (
        <label key={option.value} className={`${error ? styles.error : ""} ${styles.radioLabel}`}>
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleSelection(option.value)}
            className={styles.radioInput}
            name="custom-radio"
          />
          <span className={styles.radioCircle}></span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
