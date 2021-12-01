export interface MovieInterface {
  id: number;
  title: string;
  imdb_id: string;
  poster: string;
  year: number;
  is_on_library?: boolean;
  is_synched?: boolean;
  review?: Buffer;
}
