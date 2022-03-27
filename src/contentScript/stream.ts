export function debounce(fn: Function, timeout: number) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(null, args), timeout);
  };
}

export function throttle(fn: Function, timeout: number) {
  let timer;
  return (...args) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(null, args);
      timer = null;
    }, timeout);
  };
}
