import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "../components/Footer";
import { Geist, League_Spartan } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/app/components/Providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league_spartan",
});

export const metadata: Metadata = {
  title: "Clippers",
  description: "A clip distribution platform for creators and clippers alike",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${leagueSpartan.variable}`}>
        <Providers>
          <div className="antialiased">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
