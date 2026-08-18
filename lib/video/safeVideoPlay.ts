/** play() 중 src 변경 등으로 발생하는 AbortError는 무시 */
export function safeVideoPlay(node: HTMLVideoElement): void {
  void node.play().catch((playError) => {
    if (playError instanceof DOMException && playError.name === "AbortError") {
      return;
    }

    if (playError instanceof Error && playError.name === "AbortError") {
      return;
    }
  });
}

export function isIgnorablePlayError(error: unknown): boolean {
  return (
    error instanceof DOMException && error.name === "AbortError"
  ) || (error instanceof Error && error.name === "AbortError");
}
