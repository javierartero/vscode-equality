declare module 'chroma-js' {
  interface ChromaColor {
    hex(): string;
  }

  interface ChromaScale {
    colors(count?: number): string[];
  }

  interface ChromaStatic {
    (color: string): ChromaColor;
    scale(colors: string[]): ChromaScale;
  }

  const chroma: ChromaStatic;
  export default chroma;
}
