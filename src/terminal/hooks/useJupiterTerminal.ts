import { useEffect, useRef } from "react";
import { TerminalProps } from "../utils/interfaces";
import { useScriptLoader } from "./useScriptLoader";
import { useMount } from "./useMount";
import { useInitTerminal } from "./useInitTerminal";

export const useJupiterTerminal = (props: TerminalProps) => {
  const isMounted = useMount();
  const initTerminal = useInitTerminal(props);
  const { scriptElement } = useScriptLoader(isMounted, initTerminal);
  const isCleanedUp = useRef(false);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (!isCleanedUp.current) {
        isCleanedUp.current = true;
        if (window.Jupiter) {
          window.Jupiter.close();
        }
        if (scriptElement) {
          document.head.removeChild(scriptElement);
        }
      }
    };
  }, [scriptElement]);

  return { isMounted };
};
