"use client";
import React, { useEffect, useState } from 'react';
import styles from './loading-page.module.css';

const LoadingPage =  ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Simulate loading behavior (e.g., 1 second)
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, []);
    return (
    <>
      {isLoaded ? (
        children // Render children once loading is complete
      ) : (
        <div className={styles.loadingPage}>
          {/* Container for logo and tagline */}
          <div className={styles.contents}>
            <div className={styles.logo}>
              <img src="icons/logo.svg" alt="Logo" />
              <h2>Logotype</h2>
            </div>
            <p>Taglines</p>
          </div>
    
          {/* Loading animation */}
          <img className={styles.loader} src="icons/Loader.png" alt="Loading..." />
        </div>
      )}
    </>
    )
}

export default LoadingPage;