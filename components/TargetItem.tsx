import { TargetItemProps } from "@/types/globals";
import React, { FC } from "react";

export const TargetItem: FC<TargetItemProps> = (props) => {
  return <canvas {...props}></canvas>;
};
