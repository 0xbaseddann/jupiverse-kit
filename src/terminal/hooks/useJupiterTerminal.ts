import { useEffect } from "react";
import { TerminalProps } from "../components/Terminal";
import { useScriptLoader } from "./useScriptLoader";
import { useMount } from "./useMount";
import { useInitTerminal } from "./useInitTerminal";

export const useJupiterTerminal = (props: TerminalProps) => {
  const isMounted = useMount();
  const initTerminal = useInitTerminal(props);
  const { scriptElement } = useScriptLoader(isMounted, initTerminal);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (window.Jupiter) {
        window.Jupiter.close();
      }
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [scriptElement]);

  return { isMounted };
};
