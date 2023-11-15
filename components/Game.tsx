"use client";
import React, { useState, useEffect, useRef } from "react";
import { generateSecureRandom } from "@/hooks/useRandom";
import Target from "./Target";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addScore,
  removeLive,
  resetGame,
} from "@/redux/features/game/gameSlice";
import { canvasSize } from "@/types/globals";

const Game = () => {
  const { angle, isGameOver, lives, score, type } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();
  const target1_ref = useRef<HTMLCanvasElement | null>(null);
  const target2_ref = useRef<HTMLCanvasElement | null>(null);
  const target3_ref = useRef<HTMLCanvasElement | null>(null);

  const handleResetGame = () => {
    const click = new Audio("./click.wav");
    click.play();
    dispatch(resetGame());
  };
  const handleClick = (
    e: React.MouseEvent<HTMLCanvasElement | HTMLButtonElement>
  ) => {
    const random = generateSecureRandom(type);
    // console.log(random);

    if (
      (e.currentTarget.id === "target_1" && random[0] === 1) ||
      (e.currentTarget.id === "target_2" && random[1] === 1) ||
      (e.currentTarget.id === "target_3" && random[2] === 1)
    ) {
      dispatch(addScore());
      const correct = new Audio("./correct.mp3");
      correct.play();
    } else {
      const incorrect = new Audio("./incorrect.mp3");
      incorrect.play();
      dispatch(removeLive());
    }
  };

  useEffect(() => {
    handleResetGame();
  }, [type]);

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

      ctx1.clearRect(0, 0, canvasSize, canvasSize);
      ctx2.clearRect(0, 0, canvasSize, canvasSize);
      ctx3.clearRect(0, 0, canvasSize, canvasSize);
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
    <section className="relative flex flex-col items-center justify-center gap-8">
      {isGameOver && (
        <div className="absolute top-0 z-10 backdrop-blur-sm bg-transparent  w-full h-full p-8">
          <div className="bg-gray-950 text-white w-fit m-auto p-8">
            <h2>GameOver</h2>
            <p>Your score : {score}</p>
            <button className=" border w-full mt-4 " onClick={handleResetGame}>
              reset
            </button>
          </div>
        </div>
      )}
      <div className="title flex flex-col items-center mb-4">
        <p className="text-gray-400 text-sm mt-4">{`${
          type === "LUCK"
            ? "2 of 3 are correct choice"
            : "1 of 3 is correct choice"
        }`}</p>
      </div>
      <div className="info text-white flex justify-evenly  w-full py-2">
        <span>LIVES : {lives}</span>
        <span>SCORE : {score}</span>
        <button onClick={handleResetGame}>RESET</button>
      </div>
      <ul
        style={{ transform: `rotate(${angle}deg)` }}
        className={`h-[15rem] w-[15rem] flex justify-between my-8 origin-center transition-transform duration-200`}
      >
        <canvas
          ref={target1_ref}
          className="self-start mt-4 apply_btn_style"
          onClick={handleClick}
          id="target_1"
          width={canvasSize}
          height={canvasSize}
        ></canvas>
        <canvas
          ref={target2_ref}
          className="self-end apply_btn_style"
          onClick={handleClick}
          id="target_2"
          width={canvasSize}
          height={canvasSize}
        ></canvas>
        <canvas
          ref={target3_ref}
          className="self-start mt-4 apply_btn_style"
          onClick={handleClick}
          id="target_3"
          width={canvasSize}
          height={canvasSize}
        ></canvas>
      </ul>
    </section>
  );
};

export default Game;
