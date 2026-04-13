/**
 * Advanced Resource Prefetcher
 * Background loads assets during browser idle time to ensure a smooth scrolling experience.
 */

export const prefetchImages = (urls: string[]) => {
  if (typeof window === "undefined") return;

  const prefetch = () => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  // Use requestIdleCallback if available, otherwise fallback to setTimeout
  if ("requestIdleCallback" in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(prefetch);
  } else {
    setTimeout(prefetch, 1000);
  }
};

/**
 * Sequential prefetcher to avoid network congestion
 */
export const prefetchImagesSequentially = async (urls: string[]) => {
  for (const url of urls) {
    await new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = resolve; // Continue even on error
    });
  }
};
