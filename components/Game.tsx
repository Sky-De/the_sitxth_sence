"use client";
import React, { useState, useEffect } from "react";
import { GameBtn } from "./GameBtn";
import { generateSecureRandom } from "@/hooks/useRandom";

type GameProps = {
  type: "luck" | "sense";
};

const LivesInit: number = 3;
const LivesStep: number = 1;
const AngleStep: number = 60;
const AngleInit: number = 0;
const ScoreInit: number = 0;
const ScoreStep: number = 1;

const Game = (props: GameProps) => {
  const [score, setScore] = useState<number>(ScoreInit);
  const [count, setCount] = useState<number>(0);
  const [lives, setLives] = useState<number>(LivesInit);
  const [angle, setAngle] = useState<number>(AngleInit);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleResetGame = () => {
    setAngle(AngleInit);
    setLives(LivesInit);
    setScore(ScoreInit);
    setIsGameOver(false);
  };
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
      setScore(score + ScoreStep);
      setAngle(angle + AngleStep);
    } else {
      setAngle(angle - 60);
      if (lives > 1) {
        setLives(lives - LivesStep);
      } else {
        setLives(0);
        setIsGameOver(true);
      }
    }
  };

  useEffect(() => {
    handleResetGame();
  }, [props.type]);

  return (
    <section className="w-screen h-screen border relative flex flex-col items-center justify-center">
      <ul
        style={{ transform: `rotate(${angle}deg)` }}
        className={`h-[11rem] w-[12rem] flex justify-between transition-transform duration-1000 origin-center`}
      >
        <GameBtn
          disabled={isGameOver}
          name="A"
          onClick={handleClick}
          className="self-end apply_btn_style"
        />
        <GameBtn
          disabled={isGameOver}
          name="B"
          onClick={handleClick}
          className="self-start apply_btn_style"
        />
        <GameBtn
          disabled={isGameOver}
          name="C"
          onClick={handleClick}
          className="self-end apply_btn_style"
        />
      </ul>
      <div className="info mt-20">
        <h2>{}</h2>
        <h2>LIVES {lives}</h2>
        <h2>SCORE {score}</h2>
        <button onClick={handleResetGame}>reset</button>
        <h1 className={` ${isGameOver ? "opacity-100" : "opacity-0"}`}>
          Game Over
        </h1>
      </div>
    </section>
  );
};

export default Game;
