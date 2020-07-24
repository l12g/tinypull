(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.pullx = factory());
}(this, (function () { 'use strict';

  var defaults = {
    maxHeight: 100,
    duration: 200,
    successedDelay: 200,
    loadingText: "loading....",
    holdText: "pulldown to refresh",
    releaseText: "release to refresh",
    successedText: "successed!",
    className: "pullx",
  };

  function def(target, key, value, handler) {
    Object.defineProperty(target, key, {
      configurable: true,
      get() {
        return value;
      },
      set(val) {
        value = val;
        handler && handler(val);
      },
    });
  }

  function initData(el, topEl, config) {
    const data = {
      pos: 0,
      isHold: false,
    };
    const statusMap = {
      init: config.holdText,
      ready: config.releaseText,
      loading: config.loadingText,
      successed: config.successedText,
    };
    def(data, "height", 0, (val) => {
      topEl.style.height = val + "px";
    });
    def(data, "status", "init", (val) => {
      topEl.innerText = statusMap[val];
    });
    def(data, "animation", false, (val) => {
      topEl.style.transition = val ? `all ${config.duration}ms` : null;
    });
    data.height = 0;
    data.status = "init";
    data.animation = false;
    return data;
  }

  function disposeData(data) {
    delete data.height;
    delete data.status;
    delete data.animation;
  }

  const KEY = Symbol();
  function Pulldownx(wrapper, trigger, config) {
    const el =
      typeof wrapper === "string" ? document.querySelector(wrapper) : wrapper;

    if (!el || el[KEY]) {
      return;
    }
    def(el, KEY, true);
    const topEl = document.createElement("div");
    topEl.className = "pullx";
    topEl.style.cssText =
      "height:0;display:flex;align-items:center;justify-content:center;overflow:hidden;";

    el.prepend(topEl);
    const data = initData(el, topEl, config);
    let tid = 0;

    const close = () => {
      data.height = 0;
    };
    const success = () => {
      data.status = "successed";
      clearTimeout(tid);
      tid = setTimeout(close, config.successedDelay);
    };
    const handleStart = (evt) => {
      const [pos] = evt.touches;
      const top =
        el === document.body ? document.documentElement.scrollTop : el.scrollTop;
      if (!pos || top > 0 || data.status !== "init") {
        return;
      }
      data.animation = false;
      data.pos = pos.screenY;
      data.isHold = true;
      el.prepend(topEl);
    };
    const handleMove = (evt) => {
      if (!data.isHold) {
        return;
      }
      const [pos] = evt.touches;
      const dis = Math.floor(pos.screenY - data.pos);
      data.status = dis > (config.maxHeight / 3) * 2 ? "ready" : "init";
      data.height = Math.min(defaults.maxHeight, dis);
    };
    const handleEnd = (evt) => {
      data.isHold = false;
      data.animation = true;
      if (data.status === "init") {
        return close();
      }
      if (data.status !== "ready") {
        return;
      }
      if (typeof trigger === "function") {
        data.status = "loading";
        const r = trigger(success);
        r && r.constructor === Promise && r.then(success);
      } else {
        close();
      }
    };
    const handleTransition = (evt) => {
      data.status = "init";
    };

    const evts = [
      [topEl, "transitionend", handleTransition],
      [el, "touchstart", handleStart],
      [document, "touchend", handleEnd],
      [document, "touchmove", handleMove],
    ];
    evts.forEach(([target, evt, handler]) => {
      target.addEventListener(evt, handler);
    });
    return function clear() {
      evts.forEach(([target, evt, handler]) => {
        target.removeEventListener(evt, handler);
      });
      disposeData(data);
      try {
        topEl.remove();
        delete wrapper[KEY];
      } catch {}
    };
  }

  function init(wrapper, trigger, config) {
    return Pulldownx(wrapper, trigger, Object.assign({}, defaults, config));
  }
  init.defaults = defaults;

  return init;

})));
