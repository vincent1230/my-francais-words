export interface Word {
  word: string;
  url: any;
  extra?: string | undefined;
  quote?: string | undefined;
  pos?: string | undefined | null;
}

export interface WordQuery {
  pron?: string | null;
  image_results: ImageResult[];
  query: string;
  result: Word[];
}

export interface ImageResult {
  domain: string;
  imageHeight: number;
  imageUrl: string;
  imageWidth: number;
  link: string;
  position: number;
  source: string;
  thumbnailHeight: number;
  thumbnailUrl: string;
  thumbnailWidth: number;
  title: string;
}
