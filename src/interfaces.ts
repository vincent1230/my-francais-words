export interface Word {
  word: string;
  url: any;
  extra?: string | undefined;
  quote?: string | undefined;
  pos?: string | undefined | null;
}

export interface WordQuery {
  pron?: string | null;
  query: string;
  result: Word[];
}
