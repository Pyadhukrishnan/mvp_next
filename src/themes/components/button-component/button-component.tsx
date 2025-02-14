import React from 'react';
import styles from './button-component.module.css';

interface ButtonComponentProps{
    label:string;
    onClick:()=>void;
    buttonSize?:"large" | "small";
    theme?:string;
    disabled?:boolean;
    width?:string;
}

const ButtonComponent:React.FC<ButtonComponentProps> = ({label,
    buttonSize="large",
    onClick,
    theme="default",
    disabled=false,
    width="100%"
}) => {
    /**
     * @function themeClass
     * @description Determines the CSS class based on the selected theme.
     * @param {string} theme - The theme selected for the button.
     * @returns {string} Corresponding CSS module class for the theme.
     */
    const themeClass = (theme:string) => {
        switch (theme) {
            case "normal":
                return styles.normal;
            default:
                return styles.default;
        }
    };

    /**
     * @function size
     * @description Determines the CSS class based on the button size.
     * @param {string} buttonSize - The selected size for the button.
     * @returns {string} Corresponding CSS module class for the size.
     */
    const size = (buttonSize:string) => {
        switch (buttonSize) {
            case "large":
                return styles.large;
            case "small":
                return styles.small;
            default:
                return "";
        }
    };
  return (
    <button style={width ? { width } : undefined} className={`${size(buttonSize)} ${themeClass(theme)}`} onClick={onClick} disabled={disabled}>
            {label}
        </button>
  )
}

export default ButtonComponent