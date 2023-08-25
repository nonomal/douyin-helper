export function throttle(fn: (...any) => void, wait = 300): (...any) => void {
  let timer: any = null;
  let last: number = 0;
  return (...args) => {
    if (!timer || Date.now() < last + wait) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = Date.now();
        fn.apply(this, args);
      }, wait);
    } else {
      last = Date.now();
      fn.apply(this, args);
    }
  };
}
