/**
 * @file UseLoginServices.js
 * @description This module provides authentication services, including login validation and authentication logic.
 * 
 * @module UseLoginServices
 * 
 * @dependencies
 * - `validateEmail` (Utility function for email validation)
 * - `validatePassword` (Utility function for password validation)
 */

import { LoginResponse } from "@/interfaces/authentication";
import { validateEmail, validatePassword } from "@/utils/validation-utils";


/**
 * @function UseLoginServices
 * @description Provides authentication-related services such as login validation.
 * @returns {Object} An object containing the `login` function.
 */
export default function UseLoginServices() {
    
    /**
     * @function login
     * @description Validates user credentials and performs login authentication.
     * @async
     * @param {string} email - The email entered by the user.
     * @param {string} password - The password entered by the user.
     * @returns {Promise<Object>} An object containing the login status, message, and errors.
     * 
     * @example
     * const { login } = UseLoginServices();
     * const response = await login("admin@gmail.com", "MainAdmin12345");
     * console.log(response); // { status: true, message: "Login successful", errors: {} }
     */
    const login = async (email:string, password:string):Promise<LoginResponse> => {
        let errors:{
            emailError?:string;
            passwordError?:string;
            mainError?:string;
        } = {};

        // Validate email format
        if (!validateEmail(email)) {
            errors = {
                emailError: "有効なメールアドレスを入力してください", // "Please enter a valid email address."
                ...errors
            };
        }

        // Validate password format
        if (!validatePassword(password)) {
            errors = {
                ...errors,
                passwordError: "12文字以上20文字以内で、半角の大文字, 小文字, 数字を含めてください。" 
                // "Password must be between 12 and 20 characters long and include uppercase, lowercase letters, and numbers."
            };
        }

        // If validation fails, return error messages
        if (!validateEmail(email) || !validatePassword(password)) {
            return {
                status: false,
                message: "Validation failed",
                errors: errors
            };
        }

        // Hardcoded authentication check
        if (email === "admin@gmail.com") {
            if (password === "MainAdmin12345") {
                console.log("Login successful");
                return {
                    status: true,
                    message: "Login successful",
                    errors: {}
                };
            } else {
                return {
                    status: false,
                    message: "Login failed",
                    errors: {
                        ...errors,
                        mainError: "Password mismatched"
                    }
                };
            }
        }

        // Default response if email is not found (Consider implementing actual API call)
        return {
            status: false,
            message: "Invalid email or password",
            errors: {
                mainError: "Invalid credentials"
            }
        };
    };

    return {
        login
    };
}
