/**
 * Masks an email address by replacing the middle characters of the username with asterisks.
 *
 * @function
 * @param {string} email - The email address to be masked.
 * @returns {string} - The masked email address, preserving the first and last character of the username.
 *
 * @example
 * maskEmail("john.doe@example.com"); // Output: "j******e@example.com"
 * maskEmail("a@example.com");       // Output: "a@example.com" (unchanged if username is too short)
 */
export const maskEmail = (email: string): string => {
    const [username, domain] = email.split("@");
  
    // Validate email format
    if (!username || !domain) return email; // Return original if invalid
  
    // If the username is too short to mask, return as is
    if (username.length <= 2) return email;
  
    const firstChar = username.charAt(0);
    const lastChar = username.charAt(username.length - 1);
    const maskedPart = "*".repeat(username.length - 2);
  
    return `${firstChar}${maskedPart}${lastChar}@${domain}`;
  };
  