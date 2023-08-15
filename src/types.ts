export type TFilm = {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  rating: number | null;
};

export type TServerFilm = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TServerFilmsResponseBody = {
  page: number;
  results: TServerFilm[];
  total_pages: number;
  total_results: number;
};

export type TGenre = {
  id: number;
  name: string;
};

export type TFilmsResponseBody = {
  page: number;
  results: TFilm[];
  totalPages: number;
  totalResults: number;
};

export type TGenresResponseBody = {
  genres: TGenre[];
};
