import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist_Mono, Gothic_A1, Manrope, Montserrat, Poppins } from "next/font/google";
import { AppRouteShell } from "@/components/templates/AppRouteShell";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gothicA1 = Gothic_A1({
  variable: "--font-gothic-a1",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PLIP",
  description: "PLIP — Personal Clip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${poppins.variable} ${gothicA1.variable} ${montserrat.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <AppRouteShell>{children}</AppRouteShell>
      </body>
    </html>
  );
}
