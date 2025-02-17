import React, { useState } from 'react';
import styles from './radio-buttons.module.css';
import { Options } from '@/interfaces/user';

interface RadioButtonsProps {
  options: Options[];
  onSelect: (value: string) => void;
  error?:boolean;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ options, onSelect, error }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelection = (value: string) => {
    setSelectedValue(value); // Update local state
    onSelect(value); // Notify parent component
  };

  return (
    <div className={styles.radiobuttonsWrapper}>
      {options.map((option) => (
        <label key={option.value} className={`${error?styles.error:null} ${styles.radioLabel}`}>
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
