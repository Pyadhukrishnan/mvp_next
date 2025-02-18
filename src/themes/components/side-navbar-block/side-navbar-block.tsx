import React, { ReactNode } from "react";
import styles from "./side-navbar-block.module.css";

interface NavbarProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClickFInction: ()=>void;
}

const SideNavbarBlock: React.FC<NavbarProps> = ({ icon, label, active, onClickFInction }) => {
  return (
    <div
      className={`${styles.navBlockWrapper} ${active ? styles.active : null}`}
      onClick={onClickFInction}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default SideNavbarBlock;
