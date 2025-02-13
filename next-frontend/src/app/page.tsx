import SearchPage from "@/app/components/SearchPage";
import React from "react";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  variable: "--font-maven_pro"
})
const Home = () => {
  return (
    <main className={`${mavenPro.variable} font-sans`}>
      <SearchPage />
    </main>
  );
};

export default Home;
