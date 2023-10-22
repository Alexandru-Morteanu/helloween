import MenuBar from "@/components/MenuBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainTitle from "@/components/MainTitle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Halloween - Inorog",
  description: "Write a horror story for Halloween! Made by Inorog Team! ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MenuBar />
        <MainTitle />
        {children}
      </body>
    </html>
  );
}
