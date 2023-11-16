"use client";
import HomePage from "@/components/Home";
import { LearnModel } from "@/components/LearnModel";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function Home() {
  const { isShow } = useAppSelector((state) => state.model);

  return (
    <main className="main text-white">
      {isShow && <LearnModel />}
      <HomePage />
    </main>
  );
}
