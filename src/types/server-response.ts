import { TServerFilm } from './serverFilm';

export type TServerResponse = {
  page: number;
  results: TServerFilm[];
  total_pages: number;
  total_results: number;
};
