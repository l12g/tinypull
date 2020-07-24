import initData, { disposeData } from "./data";
import def from "./def";
import defaults from "./defaults";
const KEY = Symbol();
export default function Pulldownx(wrapper, trigger, config) {
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
