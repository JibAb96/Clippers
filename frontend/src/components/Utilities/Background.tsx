import React, { PropsWithChildren } from "react";

const Background = ({children}: PropsWithChildren) => {
  return (
    <div className="area min-h-screen flex flex-col relative">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="relartive z-10 flex-1">{children}</div>
    </div>
  );
};
export default Background;
