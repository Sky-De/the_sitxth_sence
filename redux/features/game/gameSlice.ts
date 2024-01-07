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
type SetHSTypeAction = {
  luckHS: number;
  senseHS: number;
};

const GameInitialState: GameState = {
  type: "LUCK",
  score: ScoreInit,
  lives: LivesInit,
  isGameOver: false,
  angle: AngleInit,
  highScore: {
    luck: 0, // Initialize luck score from local storage or 0 - /types/global.ts
    sense: 0, // Initialize sense score from local storage or 0 - /types/global.ts
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
    setCurrentHs(state, action: PayloadAction<SetHSTypeAction>) {
      state.highScore.luck = action.payload.luckHS;
      state.highScore.sense = action.payload.senseHS;
    },
    removeLive(state) {
      state.angle -= AngleStep;
      if (state.lives > 1) state.lives--;
      else {
        state.isGameOver = true;
        if (state.type === "LUCK" && state.score > state.highScore.luck) {
          state.highScore.luck = state.score;
          localStorage.setItem("highScoreLuck", JSON.stringify(state.score));
        }
        if (state.type === "SENSE" && state.score > state.highScore.sense) {
          state.highScore.sense = state.score;
          localStorage.setItem("highScoreSense", JSON.stringify(state.score));
        }
      }
    },
    changeType(state, action: PayloadAction<ChangeTypeAction>) {
      state.type = action.payload;
    },
  },
});

export const { resetGame, addScore, changeType, removeLive, setCurrentHs } =
  gameSlice.actions;
export default gameSlice.reducer;
