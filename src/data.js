import def from "./def";

export default function initData(el, topEl, config) {
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

export function disposeData(data) {
  delete data.height;
  delete data.status;
  delete data.animation;
}
