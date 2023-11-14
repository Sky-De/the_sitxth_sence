"use client";
import React, { useState, useEffect, useRef } from "react";
import { generateSecureRandom } from "@/hooks/useRandom";
import Target from "./Target";

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
  const target1_ref = useRef<HTMLCanvasElement | null>(null);
  const target2_ref = useRef<HTMLCanvasElement | null>(null);
  const target3_ref = useRef<HTMLCanvasElement | null>(null);

  const handleResetGame = () => {
    const click = new Audio("./click.wav");
    click.play();
    setAngle(AngleInit);
    setLives(LivesInit);
    setScore(ScoreInit);
    setIsGameOver(false);
  };
  const handleClick = (
    e: React.MouseEvent<HTMLCanvasElement | HTMLButtonElement>
  ) => {
    console.log(props.type);

    setCount(count + 1);
    const random = generateSecureRandom(props.type);
    console.log(random);

    if (
      (e.currentTarget.id === "target_1" && random[0] === 1) ||
      (e.currentTarget.id === "target_2" && random[1] === 1) ||
      (e.currentTarget.id === "target_3" && random[2] === 1)
    ) {
      const correct = new Audio("./correct.wav");
      correct.play();
      setScore(score + ScoreStep);
      setAngle(angle + AngleStep);
    } else {
      setAngle(angle - 60);
      if (lives > 1) {
        const incorrect = new Audio("./incorrect.wav");
        incorrect.play();
        setLives(lives - LivesStep);
      } else {
        const gameOver = new Audio("./game_over.wav");
        gameOver.play();
        setLives(0);
        setIsGameOver(true);
      }
    }
  };

  useEffect(() => {
    handleResetGame();
  }, [props.type]);

  useEffect(() => {
    const target_3 = new Target({
      canvas: document.getElementById("target_3"),
      type: "C",
    });
    const target_1 = new Target({
      canvas: document.getElementById("target_1"),
      type: "A",
    });
    const target_2 = new Target({
      canvas: document.getElementById("target_2"),
      type: "B",
    });

    const ctx3 = (target1_ref.current as HTMLCanvasElement).getContext("2d");
    const ctx1 = (target2_ref.current as HTMLCanvasElement).getContext("2d");
    const ctx2 = (target3_ref.current as HTMLCanvasElement).getContext("2d");
    let lastTime = 0;
    function animate(timeStamp: number) {
      let deltaTime = timeStamp - lastTime;
      deltaTime = deltaTime ? deltaTime : 1;
      lastTime = timeStamp;
      if (!ctx1 || !ctx2 || !ctx3) return;

      ctx1.clearRect(0, 0, 60, 60);
      ctx2.clearRect(0, 0, 60, 60);
      ctx3.clearRect(0, 0, 60, 60);
      target_3.draw(ctx3);
      target_3.update(deltaTime);
      target_1.draw(ctx1);
      target_2.draw(ctx2);
      target_1.update(deltaTime);
      target_2.update(deltaTime);
      // requestAnimationFrame(animate);
      requestAnimationFrame(animate);
    }
    animate(requestAnimationFrame((timeStamp) => timeStamp));
  }, []);

  return (
    <section className=" h-screen relative flex flex-col items-center justify-center">
      {isGameOver && (
        <div className="absolute top-0 z-10 backdrop-blur-sm bg-transparent  w-full h-full p-8">
          <div className="bg-black text-white w-fit m-auto p-5">
            <h2>GameOver</h2>
            <p>Your score : {score}</p>
            <button className="border w-full mt-4" onClick={handleResetGame}>
              reset
            </button>
          </div>
        </div>
      )}
      <ul
        style={{ transform: `rotate(${angle}deg)` }}
        className={`h-[11rem] w-[12rem] flex justify-between  origin-center transition-transform duration-200`}
      >
        <canvas
          ref={target1_ref}
          className="self-start apply_btn_style"
          onClick={handleClick}
          id="target_1"
          width={60}
          height={60}
        ></canvas>
        <canvas
          ref={target2_ref}
          className="self-end apply_btn_style"
          onClick={handleClick}
          id="target_2"
          width={60}
          height={60}
        ></canvas>
        <canvas
          ref={target3_ref}
          className="self-start apply_btn_style"
          onClick={handleClick}
          id="target_3"
          width={60}
          height={60}
        ></canvas>
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
