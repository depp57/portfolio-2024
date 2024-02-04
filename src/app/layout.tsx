import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Sacha Thommet • %s",
    default: "Sacha Thommet • Portfolio",
  },
  description:
    "Passionate junior software engineer currently living in France. I love the DevOps culture and building cloud native apps",
  keywords: ["Portfolio, Sacha Thommet, Software engineer, DevOps"],
  authors: [{ name: "Sacha Thommet", url: "https://sachathommet.dev" }],
};

export const viewport: Viewport = {
  themeColor: "#1c1c22",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
