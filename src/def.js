export default function def(target, key, value, handler) {
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

