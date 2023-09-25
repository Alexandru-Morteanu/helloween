"use client";
import Link from "next/link";
import { useRef } from "react";
export default () => {
  const emoji = useRef<HTMLSpanElement | null>(null);
  const MouseOnLogo = () => {
    if (emoji.current) {
      emoji.current.textContent = "🎃";
    }
  };
  const MouseOffLogo = () => {
    if (emoji.current) {
      emoji.current.textContent = "🦄";
    }
  };
  return (
    <nav
      className="flex sm:flex-row sm:pe-3 flex-col items-center justify-between"
      style={{ borderBottom: "0.01em solid rgb(160,160,255)" }}
    >
      <h3
        className="text-2xl font-serif hover:text-red-600 hover:animate-pulse transition-colors 
        duration-1000 text-white text-left m-2"
        style={{ fontFamily: "'Roboto Slab', serif" }}
        onMouseOver={MouseOnLogo}
        onMouseLeave={MouseOffLogo}
      >
        Haloween <span className="text-red-700">X</span> Inorog{" "}
        <span ref={emoji}>🦄</span>
      </h3>
      <div className="flex">
        <Link
          className="px-1.5 hover:text-orange-5100 sm:border-white hover:text-orange-600"
          href={""}
        >
          <p className="p-3 sm:p-0">Scrie</p>
        </Link>
        <Link
          className="px-1.5 hover:text-orange-5100 sm:border-white hover:text-orange-600"
          href={""}
        >
          <p className="p-3 sm:p-0">Mesaje</p>
        </Link>
        <Link
          className="px-1.5 hover:text-orange-5100 sm:border-white hover:text-orange-600"
          href={""}
        >
          <p className="p-3 sm:p-0">Cont</p>
        </Link>
      </div>
    </nav>
  );
};
