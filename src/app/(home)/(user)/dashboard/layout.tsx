import SideNavbar from "@/themes/components/side-navbar/side-navbar";
import "./globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="layoutWrapper">
        <SideNavbar />
        <div className="childrens">
        {children}
        </div>
      </div>
    </>
  );
}
