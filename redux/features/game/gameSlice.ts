import { highScoreLuck, highScoreSense } from "@/types/globals";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const LivesInit: number = 3;
const AngleStep: number = 60;
const AngleInit: number = 0;
const ScoreInit: number = 0;

type GameState = {
  type: "LUCK" | "SENSE";
  score: number;
  lives: number;
  isGameOver: boolean;
  angle: number;
  highScore: {
    luck: number;
    sense: number;
  };
};

type ChangeTypeAction = "LUCK" | "SENSE";
type HighScoreType = number;

const GameInitialState: GameState = {
  type: "LUCK",
  score: ScoreInit,
  lives: LivesInit,
  isGameOver: false,
  angle: AngleInit,
  highScore: {
    luck: highScoreLuck, // Initialize luck score from local storage or 0 - /types/global.ts
    sense: highScoreSense, // Initialize sense score from local storage or 0 - /types/global.ts
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState: GameInitialState,
  reducers: {
    resetGame(state) {
      state.angle = AngleInit;
      state.lives = LivesInit;
      state.score = ScoreInit;
      state.isGameOver = false;
    },
    addScore(state) {
      state.angle += AngleStep;
      state.score++;
    },
    removeLive(state) {
      state.angle -= AngleStep;
      if (state.lives > 1) state.lives--;
      else {
        state.isGameOver = true;
        if (state.type === "LUCK" && state.score > state.highScore.luck) {
          state.highScore.luck = state.score;
        }
        if (state.type === "SENSE" && state.score > state.highScore.sense) {
          state.highScore.sense = state.score;
        }
      }
    },
    changeType(state, action: PayloadAction<ChangeTypeAction>) {
      state.type = action.payload;
    },
  },
});

export const { resetGame, addScore, changeType, removeLive } =
  gameSlice.actions;
export default gameSlice.reducer;
