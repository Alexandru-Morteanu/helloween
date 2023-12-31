"use client";
import Link from "next/link";
import { useRef } from "react";
export default function MenuBar() {
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
  const MenuButtons: { text: string; link: string }[] = [
    { text: "Write", link: "" },
    { text: "Messages", link: "" },
    { text: "Account", link: "" },
  ];
  return (
    <nav
      className="flex sm:flex-row sm:pe-3 flex-col items-center justify-between"
      style={{ borderBottom: "0.01em solid rgb(160,160,255)" }}
    >
      <Link href={"/"}>
        <h3
          className="text-2xl font-serif hover:text-red-600 hover:animate-pulse transition-colors 
        duration-1000 text-white text-left m-2"
          onMouseOver={MouseOnLogo}
          onMouseLeave={MouseOffLogo}
        >
          Halloween <span className="text-red-700">X</span> Inorog
          <span ref={emoji}>🦄</span>
        </h3>
      </Link>
      <div className="flex">
        {MenuButtons.map((button, index) => {
          return (
            <Link
              key={index}
              className="px-2 hover:transition-colors hover:text-orange-5100 sm:border-white hover:text-red-600 font-serif"
              href={button.link}
            >
              <p className="p-3 sm:p-0">{button.text}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
