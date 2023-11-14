"use client";
import Game from "@/components/Game";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLuck, setIsLuck] = useState(false);
  return (
    <main className="border-4">
      <nav className="flex gap-6">
        <button onClick={() => setIsLuck(true)}>luck</button>
        <button onClick={() => setIsLuck(false)}>sence</button>
      </nav>
      <h2 className="mt-5 text-2xl text-center">{isLuck ? "luck" : "sense"}</h2>
      <Game type={isLuck ? "luck" : "sense"} />
    </main>
  );
}
