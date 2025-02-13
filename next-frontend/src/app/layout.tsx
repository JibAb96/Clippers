import type { Metadata } from "next";
import Header from "./header/Header";
import { Geist, League_Spartan } from "next/font/google";
import "./globals.css";
import StoreProvider from "../state/StoreProvider";
import ReactQueryProvider from "@/utilities/providers/QueryClientProvider";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${leagueSpartan.variable} antialiased`}
        >
          <ReactQueryProvider>
            <Header />
            <main>{children}</main>
          </ReactQueryProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
