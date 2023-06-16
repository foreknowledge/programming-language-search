export function debounce(func, ms) {
  let timerId = null;

  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, arguments);
    }, ms);
  };
}
