import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

// Logo for the website created using tailwind css and fontawesome icon

const Logo = () => {
  return (
    <div className="flex bg-white w-40 justify-center items-center	">
      <FontAwesomeIcon
        icon={faPaperclip}
        className="size-7 rotate-180 pl-1 text-skyblue"
      />
      <a href=".">
        <h1 className="text-skyblue font-DM text-2xl font-bold tracking-wide">
          clippers
        </h1>
      </a>
    </div>
  );
};

export default Logo;
