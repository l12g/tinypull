import defaults from "./defaults";
import pullx from "./instance";
export default function init(wrapper, trigger) {
  return pullx(wrapper, trigger);
}
init.defaults = defaults;
