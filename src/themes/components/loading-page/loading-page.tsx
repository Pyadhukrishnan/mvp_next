import React from 'react';
import styles from './loading-page.module.css';

const LoadingPage = () => {
    return (
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
    )
}

export default LoadingPage