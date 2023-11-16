"use client";
import { HomePageItems } from "@/types/globals";
import { HomeItem } from "./HomeItem";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { closeModel, setAsWatched } from "@/redux/features/models/learnSlice";

export const LearnModel = () => {
  const dispatch = useAppDispatch();

  const handleCloseModel = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    dispatch(closeModel());
  };

  const handleContentClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handleCloseCleanModel = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(setAsWatched());
  };

  return (
    <section
      onClick={handleCloseModel}
      className="model absolute top-0 w-full h-full flex justify-center items-center bg-transparent backdrop-blur-xl"
    >
      <div
        onClick={handleContentClick}
        className="model__content w-2/3 lg:w-1/3 h-fit bg-gray-800 p-3"
      >
        <div className="model__header flex items-center  justify-between">
          <h2># How to play</h2>
          <button onClick={handleCloseCleanModel} className="border px-2">
            X
          </button>
        </div>
        <ol className="no-scrollbar p-4 flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-start md:items-center h-full md:gap-10">
          {HomePageItems.map((item) => (
            <HomeItem key={item.title} {...item} />
          ))}
        </ol>
      </div>
    </section>
  );
};
