import React, { useState, useEffect, useRef } from "react";
import styles from "./selection-component.module.css";
import { Options } from "@/interfaces/user";

/**
 * Props for the SelectionComponent
 */
interface SelectionComponentProps {
  /** Array of selection options */
  options: Options[];

  /** Callback function to handle selection */
  setSelected: (value: string) => void;

  /** Placeholder text for the dropdown */
  placeholder?: string;

  /** Optional error state to apply error styling */
  error?: boolean;

  /** Optional width for the dropdown */
  width?: string;
}

/**
 * SelectionComponent
 *
 * This component renders a customizable dropdown selection menu.
 * It maintains the selected state internally and notifies the parent component
 * when an option is chosen.
 *
 * @component
 * @param {Options[]} options - Array of selection options (label and value)
 * @param {(value: string) => void} setSelected - Callback function triggered when an option is selected
 * @param {string} [placeholder="選択してください "] - Optional placeholder text for the dropdown
 * @param {boolean} [error] - Optional boolean to apply error styling
 * @param {string} [width] - Optional width for the dropdown component
 * @returns {JSX.Element} The rendered selection component
 */
const SelectionComponent: React.FC<SelectionComponentProps> = ({
  options,
  setSelected,
  placeholder = "選択してください ",
  error,
  width,
}) => {
  // State to track whether the dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // State to store the selected option label
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  // Ref to track dropdown container for click detection
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Handles clicks outside of the dropdown to close it.
   *
   * @param {MouseEvent} event - The click event
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handles the selection of an option.
   *
   * @param {string} value - The selected option value
   * @param {string} label - The selected option label
   */
  const handleSelect = (value: string, label: string) => {
    setSelected(value);
    setSelectedLabel(label);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {/* Selected option (acts as the dropdown trigger) */}
      <div
        style={width ? { width } : undefined}
        className={`${styles.selected} ${!selectedLabel ? styles.placeholder : ""} ${isOpen ? styles.active : ""} ${error ? styles.error : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.selectedItem}>{selectedLabel || placeholder}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <img src="/icons/arrow.svg" alt="Dropdown Arrow" />
        </span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectionComponent;
