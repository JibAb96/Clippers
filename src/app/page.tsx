import React from "react";
import { Maven_Pro } from "next/font/google";
import SearchPage from "./components/SearchPage";


const mavenPro = Maven_Pro({
  subsets: ["latin"],
  variable: "--font-maven_pro"
})
const Home = () => {
  return (
    <main className={`${mavenPro.variable} font-sans bg-primary h-screen`}>
        <SearchPage />
    </main>
  );
};

export default Home;
