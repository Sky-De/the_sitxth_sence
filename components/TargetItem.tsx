import React, { FC, CanvasHTMLAttributes } from "react";

export const TargetItem: FC<
  CanvasHTMLAttributes<HTMLCanvasElement> &
    React.RefAttributes<HTMLCanvasElement>
> = (props) => {
  return <canvas {...props}></canvas>;
};
