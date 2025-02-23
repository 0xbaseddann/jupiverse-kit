import { useEffect, useRef, useState } from "react";
import { TerminalProps } from "../utils/interfaces";
import { useScriptLoader } from "./useScriptLoader";
import { useMount } from "./useMount";
import { useInitTerminal } from "./useInitTerminal";

export const useJupiterTerminal = (props: TerminalProps) => {
  const isMounted = useMount();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const initTerminal = useInitTerminal(props);
  
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    if (!props.skipInit) {
      initTerminal();
    }
  };

  const { scriptElement } = useScriptLoader(isMounted, handleScriptLoad);
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

  return { isMounted, scriptLoaded };
};
