import { TServerFilm } from '../types/serverFilm';
import { TFilm } from '../types/film';

export function filmAdapter(serverFilm: TServerFilm): TFilm {
  return {
    adult: serverFilm.adult,
    backdropPath: serverFilm.backdrop_path,
    genreIds: serverFilm.genre_ids,
    id: serverFilm.id,
    originalLanguage: serverFilm.original_language,
    originalTitle: serverFilm.original_title,
    overview: serverFilm.overview,
    popularity: serverFilm.popularity,
    posterPath: serverFilm.poster_path,
    releaseDate: serverFilm.release_date,
    title: serverFilm.title,
    video: serverFilm.video,
    voteAverage: serverFilm.vote_average,
    voteCount: serverFilm.vote_count,
  };
}
