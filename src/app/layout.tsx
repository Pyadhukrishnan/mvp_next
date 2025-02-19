import type { Metadata } from "next";
import localFont from "next/font/local";
import "../themes/styles/globals.css";
import NavbarWrapper from "@/themes/components/navbar-wrapper/navbar-wrapper";
import { Suspense } from "react";
import LoadingPage from "@/themes/components/loading-page/loading-page";

const hiraginoSans = localFont({
  src: "../themes/fonts/HiraginoSans.ttf",
  display: "swap",
});
export const metadata: Metadata = {
  title: "MVP Next app",
  description: "MVP project on Next.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hiraginoSans.className}>
        <Suspense fallback={<LoadingPage>{<NavbarWrapper>{children}</NavbarWrapper>}</LoadingPage>}>
          <LoadingPage>
            <NavbarWrapper>{children}</NavbarWrapper>
          </LoadingPage>
        </Suspense>
      </body>
    </html>
  );
}
