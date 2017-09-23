const hasBeenLongEnough = timeout => {
  return !timeout;
};

export const debounce = (func, delay) => {
  let timeout = null;
  return (...args) => {
    if (hasBeenLongEnough(timeout)) {
      func(...args);
      timeout = setTimeout( () => {
        timeout = null;
      }, delay);
    }
  };
};