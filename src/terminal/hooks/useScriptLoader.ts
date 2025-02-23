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

    // Use a ref to track if init has been called
    let hasInitialized = false;

    const loadScript = () => {
      const existingScript = document.querySelector(
        'script[src="https://terminal.jup.ag/main-v3.js"]'
      );

      if (existingScript) {
        if (!hasInitialized) {
          hasInitialized = true;
          initTerminal();
        }
        return;
      }

      const script = document.createElement("script");
      script.src = "https://terminal.jup.ag/main-v3.js";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-preload", "");
      script.onload = () => {
        if (!hasInitialized) {
          hasInitialized = true;
          initTerminal();
        }
      };
      script.onerror = (error) => {
        console.error("Failed to load Jupiter Terminal script:", error);
      };
      document.head.appendChild(script);
      setScriptElement(script);
    };

    // Debounce the script loading
    const timeoutId = setTimeout(loadScript, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [initTerminal, isMounted]);

  return { scriptElement };
};
