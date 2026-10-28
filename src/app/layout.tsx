import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  Fraunces,
  Geist,
  Geist_Mono,
  Labrada,
  Griffy,
} from "next/font/google";

import Header from "../components/Header";
import "./globals.css";

const griffy = Griffy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-griffy",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const labrada = Labrada({
  variable: "--font-labrada",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cutie Hack 2026",
  description: "ACM at UCR's 12 hour, beginner-friendly hackathon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${fraunces.variable}
        ${labrada.variable}
        ${griffy.variable}
        h-full
        antialiased
      `}
    >
      <body className="flex min-h-full flex-col">
        <Header />

        {children}
      </body>
    </html>
  );
}
