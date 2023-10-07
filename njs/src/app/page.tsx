"use client";
import LogInForm from "@/components/LogInForm";
import MainTitle from "@/components/MainTitle";
import MenuBar from "@/components/MenuBar";
import { useState } from "react";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <>
      <MenuBar />
      <main className="flex justify-center font-serif flex-col">
        <MainTitle />
        <LogInForm changeToLogIn={isLoggedIn} />
      </main>
    </>
  );
}
