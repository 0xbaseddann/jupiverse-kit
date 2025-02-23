import React from "react";
import { DisplayMode } from "../utils/types";

export const getTerminalPlaceholder = (
  displayMode: DisplayMode,
  integratedTargetId?: string | null
) => {
  const placeholder = (
    <div id={integratedTargetId ? "integrated-terminal" : undefined} />
  );
  return displayMode === "integrated" ? placeholder : null;
};
