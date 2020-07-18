export default function engine(duration, cb, easing) {
  let raf, t0, resolve;

  const pms = new Promise((res) => {
    resolve = res;
  });
  function start() {
    raf = requestAnimationFrame(run);
  }
  function stop() {
    cancelAnimationFrame(raf);
    resolve && resolve();
  }
  function run(timestamp) {
    t0 = t0 || timestamp;
    const dis = timestamp - t0;
    dis > duration ? stop() : start();
    const per = Math.min(dis / duration, 1);
    cb && cb(easing ? easing(per) : per);
  }
  start();
  return pms;
}

engine.sinIn = function (t) {
  return 1 - Math.cos((t * Math.PI) / 2);
};
