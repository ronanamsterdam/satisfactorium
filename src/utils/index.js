// debounce closure
// you need to call it first on import
export const debounceCl = _ => (function() {
  let timeout
  return function(func, wait = 100, immediate = false) {
    clearTimeout(timeout)
    if (immediate) {
      timeout = null
      func.apply(this)
    } else {
      timeout = setTimeout(() => {
        timeout = null
        if (!immediate) {
            func.apply(this)
        }
      }, wait)
    }
  };
})();

