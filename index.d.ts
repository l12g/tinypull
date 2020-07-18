export default interface Pulldownx {
  (
    wrapper: string | HTMLElement,
    trigger: (done: () => void) => void | Promise
  ): () => void;
  defaults: {
    maxHeight: number;
    duration: number;
    successedDelay: number;
    holdText: string;
    releaseText: string;
    loadingText: string;
    successedText: string;
  };
}
