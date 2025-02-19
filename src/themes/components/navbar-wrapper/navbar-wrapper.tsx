import Navbar from "../navbar/navbar";
import NavbarActions from "../navabar-actions/navbar-actions";

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar additionalContents={<NavbarActions />} />
      {children} {/* This remains a Server Component */}
    </>
  );
};

export default NavbarWrapper;