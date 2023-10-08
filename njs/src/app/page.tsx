"use client";
import LogInForm from "@/components/LogInForm";
import MainTitle from "@/components/MainTitle";

export default function Main() {
  return (
    <>
      <main className="flex justify-center font-serif flex-col">
        <MainTitle />
        <LogInForm />
      </main>
    </>
  );
}
