import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ReactNode } from "react";
import Experience from "@/components/3d/Experience";
import background from "@static/loading-bg-dark.jpg";

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

type RootLayoutParams = {
  children: ReactNode;
  params: {
    lang: string;
  };
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default function RootLayout({ children, params: { lang } }: RootLayoutParams) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <div className="background-canvas">
          <Experience />
        </div>
        <div className="html-overlay bg-cover" style={{ backgroundImage: `url(${background.src})` }}>
          {children}
        </div>
      </body>
    </html>
  );
}
