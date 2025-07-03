import React from "react";
import ResetPassword from "./components/ResetPassword";
import Background from "../signin/components/Background";

const Page = () => {
  return (
    <Background>
      <div className="flex justify-center items-center h-screen">
        <ResetPassword />
      </div>
    </Background>
  );
};

export default Page;
