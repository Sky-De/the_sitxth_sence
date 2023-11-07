"use client";
import Game from "@/components/Game";
import { useState } from "react";

export default function Home() {
  const [isLuck, setIsLuck] = useState(false);
  return (
    <main>
      <nav className="flex gap-6">
        <button onClick={() => setIsLuck(true)}>luck</button>
        <button onClick={() => setIsLuck(false)}>sence</button>
      </nav>
      <h2>{isLuck ? "luck" : "sense"}</h2>
      <Game type={isLuck ? "luck" : "sense"} />
    </main>
  );
}
