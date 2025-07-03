"use client"
import React from "react";
import { Paperclip } from "lucide-react";
import Link from "next/link";

// Logo for the website created using tailwind css and lucide icon
// OPTIMIZED: Replaced FontAwesome with Lucide React for better tree-shaking and smaller bundle

const Logo = () => {
  return (
    <div className="flex bg-transparent w-40 justify-center items-center	">
      <Paperclip
        aria-hidden="false"
        className="size-7 rotate-180 pl-1 pt-2 text-secondary"
      />
      <Link href="/">
        <div className="text-secondary font-leagueSpartan text-2xl font-bold ">clippers</div>
      </Link>
    </div>
  );
};

export default Logo;
