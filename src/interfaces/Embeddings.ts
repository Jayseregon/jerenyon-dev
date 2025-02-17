export interface Keyword {
  word: string;
  x: number;
  y: number;
}

export interface EmbeddingData {
  keywords: Keyword[];
}

export interface HighlightDefinition {
  keyword: string;
  why: string;
}
