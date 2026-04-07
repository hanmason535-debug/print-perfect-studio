import { useEffect } from "react";

/**
 * Global optimization hook that pauses all CSS animations and transitions
 * when the user switches tabs or minimizes the browser.
 * This prevents heavy background GPU/CPU usage on outdated machines.
 */
export const useTabVisibility = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add("pause-animations");
      } else {
        document.body.classList.remove("pause-animations");
      }
    };

    // Set initial state
    handleVisibilityChange();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};
