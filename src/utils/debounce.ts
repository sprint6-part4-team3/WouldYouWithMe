/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 디바운스
 */
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
