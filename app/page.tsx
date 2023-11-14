"use client";
import Game from "@/components/Game";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLuck, setIsLuck] = useState(false);
  return (
    <main className="h-screen">
      <header className="sticky top-0 p-2 bg-black">
        <h1 className="text-white text-2xl">TSS-GAME</h1>
        <nav className="flex gap-6 text-white p-4 bg-black">
          <button
            className={`ml-auto ${isLuck ? "font-bold" : ""}`}
            onClick={() => setIsLuck(true)}
          >
            luck
          </button>
          <button
            className={`${!isLuck ? "font-bold" : ""}`}
            onClick={() => setIsLuck(false)}
          >
            sence
          </button>
        </nav>
      </header>
      <h2 className="mt-5 text-2xl text-center text-white">
        {isLuck ? "LUCK : 2 of 3 is correct" : "SENSE : 1 of 3 is correct"}
      </h2>
      <Game type={isLuck ? "luck" : "sense"} />
    </main>
  );
}
