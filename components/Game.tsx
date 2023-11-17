"use client";
import React, { useEffect, useRef } from "react";
import { generateSecureRandom } from "@/hooks/useRandom";
import Target from "./Target";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addScore,
  changeType,
  removeLive,
  resetGame,
} from "@/redux/features/game/gameSlice";
import { canvasSize } from "@/types/globals";
import { PlaySound } from "@/hooks/playSound";

const Game = () => {
  const { angle, isGameOver, lives, score, type } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();

  // target refs
  const target1_ref = useRef<HTMLCanvasElement | null>(null);
  const target2_ref = useRef<HTMLCanvasElement | null>(null);
  const target3_ref = useRef<HTMLCanvasElement | null>(null);

  // audio refs
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleResetGame = () => {
    PlaySound({ elmRef: clickAudioRef });
    dispatch(resetGame());
  };
  const handleClick = (
    e: React.MouseEvent<HTMLCanvasElement | HTMLButtonElement>
  ) => {
    const random = generateSecureRandom(type);
    if (
      (e.currentTarget.id === "target_1" && random[0] === 1) ||
      (e.currentTarget.id === "target_2" && random[1] === 1) ||
      (e.currentTarget.id === "target_3" && random[2] === 1)
    ) {
      dispatch(addScore());
      PlaySound({ elmRef: correctAudioRef });
    } else {
      PlaySound({ elmRef: incorrectAudioRef });
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
      requestAnimationFrame(animate);
    }
    animate(requestAnimationFrame((timeStamp) => timeStamp));
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center gap-8">
      {/* AUDIO---------------------------------- */}
      <audio className="hidden" ref={correctAudioRef}>
        <source src="./correct.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio className="hidden" ref={incorrectAudioRef}>
        <source src="./incorrect.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio className="hidden" ref={clickAudioRef}>
        <source src="./click.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {/* GAME OVER ALERT---------------------------------- */}
      {isGameOver && (
        <div className="absolute top-0 z-10 backdrop-blur-sm bg-transparent  w-full h-full p-16">
          <div className="bg-gray-950 text-white w-fit m-auto p-10 text-center">
            <h2 className="font-bold text-red-400 text-2xl mb-4">GameOver</h2>
            <p className="text-md mb-4">Your score : {score}</p>
            <button
              className=" border w-full mt-4 p-2"
              onClick={handleResetGame}
            >
              reset
            </button>
          </div>
        </div>
      )}
      {/* TYPE OF GAME-------------------------------------------------------------- */}
      <div className="typeSelect text-white  w-full flex justify-evenly p-4">
        <button
          className={`${
            type === "LUCK" ? "font-bold opacity-100" : "opacity-50"
          } text-xl`}
          onClick={() => dispatch(changeType("LUCK"))}
        >
          Luck
        </button>
        <button
          className={`${
            type === "SENSE" ? "font-bold opacity-100" : "opacity-50"
          } text-xl`}
          onClick={() => dispatch(changeType("SENSE"))}
        >
          Sence
        </button>
      </div>
      {/*GAME INFO-------------------------------------------------------------- */}
      <div className=" text-white flex justify-evenly  w-full py-2 items-center">
        <div className="info flex flex-col gap-2">
          <span className="text-gray-400">
            Chance : {type === "LUCK" ? "66%" : "33%"}
          </span>
          <span className="text-gray-400">LIVES : {lives}</span>
          <span className="text-gray-400">SCORE : {score}</span>
        </div>
        <button className="border p-2" onClick={handleResetGame}>
          RESET
        </button>
      </div>
      {/*GAME TARGETS-------------------------------------------------------------- */}
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
