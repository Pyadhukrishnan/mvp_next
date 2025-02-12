"use client";

import { usePathname, useRouter } from "next/navigation";
import ButtonComponent from "../button-component/button-component";
import Navbar from "../navbar/navbar";

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const getAdditionalContents = () => {
    if (pathname === "/login") {
      return (
        <ButtonComponent buttonSize="small" label={"新規登録"} onClick={() => router.push("/register-user")} />
      );
    } else if (pathname === "/register-user") {
      return (
        <ButtonComponent buttonSize="small" label={"ログイン"} onClick={() => router.push("/login")} />
      );
    } else if (pathname.startsWith("/profile")) {
      return <p>Profile Details</p>;
    }
    return null;
  };

  return (
    <>
      <Navbar additionalContents={getAdditionalContents()} />
      {children}
    </>
  );
};

export default NavbarWrapper;
