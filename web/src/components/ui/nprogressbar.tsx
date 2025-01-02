"use client";

import { AppProgressBar } from "next-nprogress-bar";

const NProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <AppProgressBar
        height="2px"
        color="#118fd0"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
export default NProgressBar;
