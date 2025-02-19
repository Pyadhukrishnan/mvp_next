"use client";

import React, { useEffect, useState } from "react";
import styles from "./client-loader.module.css";

const ClientLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoaded ? (
        children // Render children once loading is complete
      ) : (
        <div className={styles.loadingPage}>
          <div className={styles.contents}>
            <div className={styles.logo}>
              <img src="icons/logo.svg" alt="Logo" />
              <h2>Logotype</h2>
            </div>
            <p>Taglines</p>
          </div>

          <img className={styles.loader} src="icons/Loader.png" alt="Loading..." />
        </div>
      )}
    </>
  );
};

export default ClientLoader;
