import { TFilm } from './film';

export type TData = {
  films: TFilm[];
  page: number;
  results: number;
  totalPages: number;
};
