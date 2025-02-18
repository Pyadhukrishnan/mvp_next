// src/utils/cookies.ts
import Cookies from 'js-cookie';

/**
 * Function to set the authentication token in cookies.
 * 
 * @param token - The authentication token to be stored in cookies.
 */
export function setAuthCookies(token: string) {
    Cookies.set('accessToken', token, {
        expires: 7,  // 7 days expiration
        secure: process.env.NODE_ENV === 'production',  // Ensures cookies are sent over HTTPS in production
        path: '/',
    });
}

/**
 * Function to get the authentication token from cookies.
 */
export function getAuthCookies() {
    return Cookies.get('accessToken');
}

/**
 * Function to remove the authentication token from cookies.
 */
export function removeAuthCookies() {
    Cookies.remove('accessToken', { path: '/' });
}
