export const requestAnimationFrame = (function () {
    let start = 0;
    return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
                const now = Date.now();
                const delay = Math.max(0, 16.7 - (now - start));
                let tId = window.setTimeout(function () { callback(now + delay); }, delay);
                start = now + delay;
                return tId;
          }
})();

export const cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        function (id) { window.clearTimeout(id); }
})();