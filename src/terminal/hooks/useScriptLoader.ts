import { useEffect, useState } from "react";

export const useScriptLoader = (
  isMounted: boolean,
  initTerminal: () => void
) => {
  const [scriptElement, setScriptElement] = useState<HTMLScriptElement | null>(
    null
  );

  useEffect(() => {
    if (!isMounted) return;

    const loadScript = () => {
      if (
        document.querySelector(
          'script[src="https://terminal.jup.ag/main-v3.js"]'
        )
      ) {
        initTerminal();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://terminal.jup.ag/main-v3.js";
      script.async = true;
      script.defer = true;
      script.onload = initTerminal;
      document.head.appendChild(script);
      setScriptElement(script);
    };

    setTimeout(loadScript, 0);
  }, [initTerminal, isMounted]);

  return { scriptElement };
};
