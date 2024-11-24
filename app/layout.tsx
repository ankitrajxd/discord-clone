import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from "next/font/google";
import Nav from "./components/Nav";

const whitney = localFont({
  src: [
    {
      path: "../public/whitney/whitneybook.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/whitney/whitneymedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/whitney/whitneysemibold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-whitney",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Discord",
  description: "Discord clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`scrollbar-hide ${whitney.className} ${poppins.variable} antialiased `}
      >
        <Nav>{children}</Nav>
      </body>
    </html>
  );
}
