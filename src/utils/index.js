// debounce closure
// you need to call it first on import
export const debounceCl = _ => (function() {
  let timeout

  return function(func, wait = 100, immediate = false) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) {
          func.apply(this)
      }
    }, wait)
    if (immediate && !timeout) {
      func.apply(this)
    }
  };
})();