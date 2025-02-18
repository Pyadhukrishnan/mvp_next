import React from "react";
import styles from "./side-navbar.module.css";
import { Icons } from "@/themes/icons/icons";
import {
  accountLinks,
  basicInformationLinks,
  getActiveStatus,
  navigateTo,
} from "@/utils/navigation-utils";
import SideNavbarBlock from "../side-navbar-block/side-navbar-block";
import { usePathname, useRouter } from "next/navigation";

const SideNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (path: string) => {
    navigateTo(path, router.push);
  };
  return (
    <div className={styles.sideNavbar}>
      <div className={styles.header}>
        <span className={styles.backArrow}>{Icons.arrowLeft}</span>
        <span>もどる</span>
      </div>

      <div className={styles.account}>
        <h2>アカウント</h2>
        <div className={styles.accountNavigationLinks}>
          {accountLinks.map((link) => {
            return (
              <SideNavbarBlock
                active={getActiveStatus(link.path, pathname)}
                icon={Icons[link.icon]}
                label={link.label}
                onClickFInction={() => {
                  handleNavClick(link.path);
                }}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.basicInformation}>
        <h2>基本情報</h2>
        <div className={styles.basicInformationLinks}>
          {basicInformationLinks.map((link) => {
            return (
              <SideNavbarBlock
                active={getActiveStatus(link.path, pathname)}
                icon={Icons[link.icon]}
                label={link.label}
                onClickFInction={() => {
                  handleNavClick(link.path);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
