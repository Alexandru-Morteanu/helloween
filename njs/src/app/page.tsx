"use client";
import LogInForm from "@/components/LogInForm";
import MainTitle from "@/components/MainTitle";
import { Suspense } from "react";
// import Loading from "./loading";

export default function Main() {
  return (
    <>
      <main className="flex justify-center font-serif flex-col">
        <MainTitle />
        {/* <Suspense fallback={<Loading />}> */}
        <LogInForm />
        {/* </Suspense> */}
      </main>
    </>
  );
}
