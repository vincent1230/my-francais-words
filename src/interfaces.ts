export interface Word {
  word: string;
  url: any;
  extra?: string | undefined;
  quote?: string | undefined;
  pos?: string | undefined | null;
}

export interface WordQuery {
  pron?: string;
  query: string;
  result: Word[];
}
