"use client";
import React, { useState } from 'react';
import styles from './login.module.css';
import LoginForm from '../components/login-form/login-form';
import ResetForm from '../components/reset-form/reset-form';

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
      <div className={styles.loginPageWrapper}>
        {/* Conditional rendering of login or password reset form */}
        {showLogin ? (
          <LoginForm setShowLogin={setShowLogin} />
        ) : (
          <ResetForm setLoginToggle={setShowLogin} />
        )}
      </div>
    );
}

export default Login