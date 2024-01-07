import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setCurrentHs } from "@/redux/features/game/gameSlice";

// to prevent Hydration Error while using localstorage and redux and next js
export const useGetAndSetStorage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let storedHighScoreLuck = localStorage.getItem("highScoreLuck")
      ? Number(localStorage.getItem("highScoreLuck"))
      : 0;
    let storedHighScoreSense = localStorage.getItem("highScoreSense")
      ? Number(localStorage.getItem("highScoreSense"))
      : 0;

    dispatch(
      setCurrentHs({
        luckHS: storedHighScoreLuck,
        senseHS: storedHighScoreSense,
      })
    );
  }, []);
};
