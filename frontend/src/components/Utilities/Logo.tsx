import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// Logo for the website created using tailwind css and fontawesome icon

const Logo = () => {
  return (
    <div className="flex bg-transparent w-40 justify-center items-center	">
      <FontAwesomeIcon
        icon={faPaperclip}
        aria-hidden="false"
        className="size-7 rotate-180 pl-1 pt-2 text-secondary"
      />
      <Link to="/">
        <div className="text-secondary font-leagueSpartan text-2xl font-bold ">clippers</div>
      </Link>
    </div>
  );
};

export default Logo;
