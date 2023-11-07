"use client";
import React, { useState } from "react";
import { GameBtn } from "./GameBtn";
import { generateSecureRandom } from "@/hooks/useRandom";

type GameProps = {
  type: "luck" | "sense";
};

const Game = (props: GameProps) => {
  const [score, setScore] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(props.type);

    setCount(count + 1);
    const random = generateSecureRandom(props.type);
    console.log(random);

    if (
      (e.currentTarget.name === "A" && random[0] === 1) ||
      (e.currentTarget.name === "B" && random[1] === 1) ||
      (e.currentTarget.name === "C" && random[2] === 1)
    ) {
      setScore(score + 1);
      //   e.currentTarget.style.color = "red";
    } else {
      if (score > 0) setScore(score - 1);
    }
  };

  return (
    <section className="w-screen h-screen border grid place-content-center">
      <ul className="border h-44 w-96 flex justify-evenly">
        <GameBtn
          name="A"
          onClick={handleClick}
          className="self-end apply_btn_style"
        />
        <GameBtn
          name="B"
          onClick={handleClick}
          className="self-start apply_btn_style"
        />
        <GameBtn
          name="C"
          onClick={handleClick}
          className="self-end apply_btn_style"
        />
      </ul>
      <h2>
        {score} of {count}
      </h2>
    </section>
  );
};

export default Game;
