export interface Word {
  word: string;
  url: any;
  pos?: string | undefined | null;
}

export interface WordQuery {
  pron?: string;
  query: string;
  result: Word[];
}
