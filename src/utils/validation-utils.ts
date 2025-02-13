/**
 * @file validationUtils.js
 * @description Utility functions for validating email and password inputs.
 */

/**
 * Validates an email address format.
 *
 * @param {string} email - The email address to be validated.
 * @returns {boolean} `true` if the email format is valid, otherwise `false`.
 *
 * @example
 * validateEmail("test@example.com"); // true
 * validateEmail("invalid-email"); // false
 */
export const validateEmail = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

/**
 * Validates a password based on the following criteria:
 * - Must be between 12 and 20 characters long.
 * - Must contain at least one lowercase letter.
 * - Must contain at least one uppercase letter.
 * - Must contain at least one number.
 *
 * @param {string} password - The password to be validated.
 * @returns {boolean} `true` if the password meets all criteria, otherwise `false`.
 *
 * @example
 * validatePassword("StrongPass123"); // true
 * validatePassword("weakpass"); // false
 */
export const validatePassword = (password:string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{12,20}$/;
    return passwordRegex.test(password);
};


/**
 * Validates both passwords.
 *
 * @param {string} newPassword - The password to be validated.
 * @param {string} confirmPassword - The confirm password to be validated.
 * @returns {boolean} `true` if the passwords are the same otherwise `false`.
 *
 * @example
 * validatePasswordsMatch("Password123","Password123"); // true
 * validatePasswordsMatch("invalidPassword","Password123"); // false
 */
export const validatePasswordsMatch = (newPassword:string,confirmPassword:string) => {
    if(confirmPassword === "" ){
        return true;
    }
    return newPassword === confirmPassword ? true: false;
}