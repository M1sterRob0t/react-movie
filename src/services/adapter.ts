import format from 'date-fns/format';

import { TFilmsResponseBody, TServerFilmsResponseBody, TFilm, TServerFilm } from '../types';

function filmAdapter(serverFilm: TServerFilm): TFilm {
  return {
    adult: serverFilm.adult,
    backdropPath: serverFilm.backdrop_path,
    genreIds: serverFilm.genre_ids,
    id: serverFilm.id,
    originalLanguage: serverFilm.original_language,
    originalTitle: serverFilm.original_title,
    overview: serverFilm.overview,
    popularity: serverFilm.popularity,
    posterPath: serverFilm.poster_path ? serverFilm.poster_path : '',
    releaseDate: serverFilm.release_date === '' ? '' : format(new Date(serverFilm.release_date), 'MMMM d, yyyy'),
    title: serverFilm.title,
    video: serverFilm.video,
    voteAverage: Number(serverFilm.vote_average.toFixed(1)),
    voteCount: serverFilm.vote_count,
    rating: null,
  };
}

export function responseBodyAdapter(serverResponseBody: TServerFilmsResponseBody): TFilmsResponseBody {
  return {
    page: serverResponseBody.page,
    results: serverResponseBody.results.map((film) => filmAdapter(film)),
    totalPages: serverResponseBody.total_pages,
    totalResults: serverResponseBody.total_results,
  };
}
