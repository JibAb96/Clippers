import React, { PropsWithChildren } from "react";
import Header from "../Header/Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
        {children}
    </>
  );
};
export default Layout;
