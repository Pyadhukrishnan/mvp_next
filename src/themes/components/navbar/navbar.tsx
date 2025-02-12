import React from 'react';
import styles from './navbar.module.css';

interface NavbarProps{
    additionalContents?:React.ReactNode;
}

const Navbar:React.FC<NavbarProps> = ({ additionalContents = null }) => {  
    return (
      <div className={styles.navbar}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <img src="/icons/logo.svg" alt="Logo" />
          <h2 className={styles.logoHeader}>Service Name</h2>
        </div>
  
        {/* Optional additional contents */}
        {additionalContents && <div className={styles.additional}>{additionalContents}</div>}
      </div>
    );
  };
  
  export default Navbar;
  