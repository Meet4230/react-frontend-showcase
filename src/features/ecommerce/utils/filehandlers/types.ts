export interface PreviewState {
  mainImage: string;
  subImages: string[];
}

export interface SetPreviewFunction {
  (prev: PreviewState): PreviewState;
}
