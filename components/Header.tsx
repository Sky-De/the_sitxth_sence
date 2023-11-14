"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { changeType } from "@/redux/features/game/gameSlice";
import React, { useState } from "react";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.game);

  return (
    <header className="sticky top-0 px-4 h-[60px] bg-black flex items-center shadow-sm shadow-gray-500">
      <h1 className="text-white text-2xl" title="The Sixth Sense">
        TSS-GAME
      </h1>
      <nav className="flex gap-6 text-white bg-black ml-auto">
        <button
          className={`ml-auto ${
            type === "LUCK" ? "font-bold opacity-100" : "opacity-50"
          }`}
          onClick={() => dispatch(changeType("LUCK"))}
        >
          Luck
        </button>
        <button
          className={`${
            type === "SENSE" ? "font-bold opacity-100" : "opacity-50"
          }`}
          onClick={() => dispatch(changeType("SENSE"))}
        >
          Sence
        </button>
      </nav>
    </header>
  );
};
