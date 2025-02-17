import React, { useState, useEffect, useRef } from "react";
import styles from "./selection-component.module.css";
import { Options } from "@/interfaces/user";

interface SelectionComponentProps {
  options: Options[];
  setSelected: (value: string) => void;
  placeholder?: string;
  error?:boolean;
  width?:string;
}

const SelectionComponent: React.FC<SelectionComponentProps> = ({
  options,
  setSelected,
  placeholder = "選択してください ",
  error,
  width
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = (value: string, label: string) => {
    setSelected(value);
    setSelectedLabel(label);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
      style={width ? { width } : undefined}
        className={`${styles.selected} ${
          !selectedLabel ? styles.placeholder : ""
        } ${isOpen?styles.active:null} ${error?styles.error:null}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.selectedItem} >{selectedLabel || placeholder}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <img src="/icons/arrow.svg" />
        </span>
      </div>

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
