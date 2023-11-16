import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/redux/features/game/gameSlice";
import modelReducer from "@/redux/features/models/learnSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    model: modelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
