import defaults from "./defaults";
import pullx from "./instance";
export default function init(wrapper, trigger, config) {
  return pullx(wrapper, trigger, Object.assign({}, defaults, config));
}
init.defaults = defaults;
