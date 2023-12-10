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
  const { angle, isGameOver, lives, score, type, highScore } = useAppSelector(
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
  const handleTargetClick = (
    e: React.MouseEvent<HTMLCanvasElement | HTMLButtonElement>
  ) => {
    if (isGameOver) return;
    const randomArray = generateSecureRandom(type);
    if (
      (e.currentTarget.id === "target_1" && randomArray[0] === 1) ||
      (e.currentTarget.id === "target_2" && randomArray[1] === 1) ||
      (e.currentTarget.id === "target_3" && randomArray[2] === 1)
    ) {
      PlaySound({ elmRef: correctAudioRef });
      dispatch(addScore());
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
      canvas: document.getElementById("target_1"),
      type: "A",
    });
    const target_1 = new Target({
      canvas: document.getElementById("target_2"),
      type: "B",
    });
    const target_2 = new Target({
      canvas: document.getElementById("target_3"),
      type: "C",
    });

    const ctx1 = (target1_ref.current as HTMLCanvasElement).getContext("2d");
    const ctx2 = (target2_ref.current as HTMLCanvasElement).getContext("2d");
    const ctx3 = (target3_ref.current as HTMLCanvasElement).getContext("2d");
    let lastTime = 0;
    function animate(timeStamp: number) {
      let deltaTime = timeStamp - lastTime;
      deltaTime = deltaTime ? deltaTime : 1;
      lastTime = timeStamp;
      if (!ctx1 || !ctx2 || !ctx3) return;

      ctx1.clearRect(0, 0, canvasSize, canvasSize);
      ctx2.clearRect(0, 0, canvasSize, canvasSize);
      ctx3.clearRect(0, 0, canvasSize, canvasSize);
      target_1.draw(ctx1);
      target_2.draw(ctx2);
      target_3.draw(ctx3);
      target_1.update(deltaTime);
      target_2.update(deltaTime);
      target_3.update(deltaTime);
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
              className="border w-full mt-4 p-2"
              onClick={handleResetGame}
            >
              reset
            </button>
          </div>
        </div>
      )}
      {/* TYPE OF GAME-------------------------------------------------------------- */}
      <div className="typeSelect text-white w-full flex justify-evenly md:justify-center md:gap-8 mt-8">
        <button
          className={`${
            type === "LUCK" ? "font-bold opacity-100" : "opacity-50"
          } text-xl border p-2 rounded-md`}
          onClick={() => dispatch(changeType("LUCK"))}
        >
          Luck
        </button>
        <button
          className={`${
            type === "SENSE" ? "font-bold opacity-100" : "opacity-50"
          } text-xl border p-2 rounded-md`}
          onClick={() => dispatch(changeType("SENSE"))}
        >
          Sence
        </button>
        <div className="border flex justify-center items-center rounded-full"></div>
        <button
          className=" p-2 rounded-md text-resetBtn resetBtn"
          onClick={handleResetGame}
        >
          RESET
        </button>
      </div>

      {/*GAME TIP-------------------------------------------------------------- */}
      <p className=" text-gray-400 max-w-[90%] md:max-w-[50%] text-center border-b pb-4 md:pb-8">
        <span className="md:hidden">Tap</span>
        <span className="hidden md:inline">Click</span> on one of circles below,
        this is completly RANDOM on each choice live{" "}
      </p>

      {/*GAME INFO-------------------------------------------------------------- */}
      <div className=" text-white flex justify-evenly  w-full items-center">
        <div className="info flex  gap-8 flex-wrap justify-center">
          <span className="text-gray-400">
            Chance ~ : {type === "LUCK" ? "66%" : "33%"}
          </span>
          <span className="text-gray-400">
            H-Score : <span className="opacity-0">s</span>
            <span className="text-white">
              {type === "LUCK" ? highScore?.luck : highScore?.sense}
            </span>
          </span>
          <span className="text-gray-400">
            Score : <span className="opacity-0">s</span>
            <span className="text-white">{score}</span>
          </span>
          <span className="text-gray-400">
            Lives : <span className="opacity-0">s</span>
            <span className="text-white">{lives}</span>
          </span>
        </div>
      </div>
      {/*GAME TARGETS-------------------------------------------------------------- */}
      <ul
        style={{ transform: `rotate(${angle}deg)` }}
        className={`h-[15rem] w-[15rem] flex justify-between my-8 origin-center transition-transform duration-200`}
      >
        <canvas
          ref={target1_ref}
          className="self-start mt-4 apply_btn_style"
          onClick={handleTargetClick}
          id="target_1"
          width={canvasSize}
          height={canvasSize}
        ></canvas>
        <canvas
          ref={target2_ref}
          className="self-end apply_btn_style"
          onClick={handleTargetClick}
          id="target_2"
          width={canvasSize}
          height={canvasSize}
        ></canvas>
        <canvas
          ref={target3_ref}
          className="self-start mt-4 apply_btn_style"
          onClick={handleTargetClick}
          id="target_3"
          width={canvasSize}
          height={canvasSize}
        ></canvas>
      </ul>
    </section>
  );
};

export default Game;
