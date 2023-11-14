"use client";
import Game from "@/components/Game";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useState, useEffect } from "react";

export default function Home() {
  const { type } = useAppSelector((state) => state.game);
  return (
    <main className="main">
      <Game />
    </main>
  );
}
