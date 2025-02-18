import {
  RegisterUserResponse,
  VerifyRegistrationResponse,
} from "@/interfaces/authentication";
import http from "@/utils/http";
import {
  validateEmail,
  validateOtp,
  validatePassword,
} from "@/utils/validation-utils";

/**
 * Custom hook for handling user registration services.
 * Validates email and password before proceeding with registration.
 *
 * @returns {Object} - Returns an object containing the `registerUser` function.
 */
export default function UseRegisterUserService() {
  /**
   * Registers a new user by validating email and password.
   *
   * @param {string} email - The email address provided by the user.
   * @param {string} newPassword - The new password chosen by the user.
   * @param {string} confirmPassword - The confirmation of the new password.
   * @returns {Promise<RegisterUserResponse>} - A promise resolving to a response object indicating success or failure.
   *
   * @throws Will throw an error if an exception occurs during validation or registration.
   */
  const registerUser = async (
    email: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<RegisterUserResponse> => {
    try {
      let errors: {
        emailError?: string;
        passwordError?: string;
        mainError?: string;
      } = {};

      // Validate email format
      if (!validateEmail(email)) {
        errors = {
          emailError: "有効なメールアドレスを入力してください", // "Please enter a valid email address"
          ...errors,
        };
      }

      // Validate password strength
      if (!validatePassword(newPassword)) {
        errors = {
          ...errors,
          passwordError:
            "12文字以上20文字以内で、半角の大文字, 小文字, 数字を含めてください。",
          // "Password must be between 12 to 20 characters and include uppercase, lowercase, and numbers."
        };
      }

      // Proceed if all validations pass
      if (
        validateEmail(email) &&
        validatePassword(newPassword) &&
        validatePassword(confirmPassword)
      ) {
        
        const otpVerification = true;
        const props: JSON = <JSON>(<unknown>{email, newPassword, otpVerification });
        const { body } = await http().post("auth/admin/signup", props, false);
        console.log(body);
        return {
          status: true,
          message: "Registration Successful",
          errors: {},
        };
      } else {
        return {
          status: false,
          message: "Registration failed",
          errors,
        };
      }
    } catch (error) {
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  /**
   * @function verifyRegistration
   * @description Validates a one-time password (OTP) by checking its format and comparing it to a predefined value.
   *
   * @param {string} otp - The OTP input provided by the user.
   * @returns {Promise<VerifyRegistrationResponse>} A promise resolving to an object containing the validation status and message.
   *
   * @throws {Error} If an unexpected error occurs during execution.
   *
   * @example
   * ```tsx
   * const response = await verifyRegistration("123456");
   * console.log(response); // { status: true, message: "OTP Validated" }
   * ```
   */
  const verifyRegistration = async (
    otp: string
  ): Promise<VerifyRegistrationResponse> => {
    try {
      console.log(otp);
      // Validate OTP format (must be a 6-digit number)
      if (!validateOtp(otp)) {
        return {
          status: "error",
          message: "無効な OTP。 6 桁の数字である必要があります",
        };
      }

      // Simulated API check for OTP validation
      if (otp === "123456") {
        return {
          status: true,
          message: "OTP Validated",
        };
      }

      // Return an error if the OTP is incorrect
      return {
        status: "error",
        message: "OTP is incorrect",
      };
    } catch (error) {
      // Handle unexpected errors
      return {
        status: "error",
        message: "An unexpected error occurred",
      };
    }
  };

  return {
    registerUser,
    verifyRegistration,
  };
}
