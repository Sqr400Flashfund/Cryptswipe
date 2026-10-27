/** Decorative work waits for page load and an idle slot; never blocks content. */
export function deferMotion(callback: () => void) {
  let cancelIdle = () => {};
  const schedule = () => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(callback, { timeout: 2500 });
      cancelIdle = () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(callback, 1500);
      cancelIdle = () => clearTimeout(id);
    }
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    cancelIdle();
  };
}