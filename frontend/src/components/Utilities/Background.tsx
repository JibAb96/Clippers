import React, { PropsWithChildren } from "react";

const Background = ({children}: PropsWithChildren) => {
  return (
    <div className="area">
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
      <div className="relative z-100">{children}</div>
    </div>
  );
};
export default Background;
