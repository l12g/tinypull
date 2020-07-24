export default interface pullx {
  (
    wrapper: string | HTMLElement,
    trigger: (done: () => void) => void | Promise<any>
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
