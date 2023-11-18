import { CanvasHTMLAttributes } from "react";

export type GameType = "LUCK" | "SENSE";

export type MyEventType = React.MouseEvent<
  HTMLButtonElement | HTMLDivElement,
  MouseEvent
>;

export type TargetItemProps = CanvasHTMLAttributes<HTMLCanvasElement> &
  React.RefAttributes<HTMLCanvasElement>;

export const canvasSize: number = 80;

export const HomePageItems = [
  {
    title: "Game Start",
    description: [
      `Begin the game by tapping on the "Play Now" or "Game" button.`,
    ],
  },
  {
    title: "Objective",
    description: [`Choose one circle from the three presented options.`],
  },
  {
    title: "Scoring",
    description: [
      `Correct Choice : Gains 1 score and the circles rotate clockwise.`,
      `Incorrect Choice : Loses 1 life and the circles rotate counterclockwise..`,
    ],
  },
  {
    title: "Game Modes",
    description: [
      `Luck Mode: Provides a 66% chance to select the correct circle.`,
      `Sense Mode: Provides a 33% chance to select the correct circle.`,
    ],
  },
  {
    title: "Lives",
    description: [
      `Start with 3 of lives.`,
      `If your lives reach zero, the game ends.`,
    ],
  },
];
