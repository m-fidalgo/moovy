export type MovieInterface = {
  id: number;
  title: string;
  imdb_id: string;
  poster: string;
  year: number;
  is_synched?: boolean;
  review?: Buffer;
};
