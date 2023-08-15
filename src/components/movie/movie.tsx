import { useContext } from 'react';
import { Rate } from 'antd';

import { TFilm } from '../../types/film';
import { hideLongDescription } from '../../utils';
import GenresList from '../genres-list';
import './movie.css';
import { GenresContext } from '../genres-context/genres-context';
import RatingNumber from '../rating-number';

const MAX_DESC_LENGTH = 110;

interface IMovie {
  film: TFilm;
  onRatingChange: (movieId: number, newRating: number) => void;
}

function Movie({ film, onRatingChange }: IMovie): JSX.Element {
  const genres = useContext(GenresContext);
  const movieGenres = genres.filter((genre) => film.genreIds.includes(genre.id));

  return (
    <li className="movies__item movie">
      <div className="movie__content">
        <div className="movie__inner">
          <h3 className="movie__title">{film.title}</h3>
          <h4 className="movie__date">{film.releaseDate}</h4>
          <GenresList genres={movieGenres} />
          <div className="movie__desc">{hideLongDescription(film.overview, MAX_DESC_LENGTH)}</div>
          <RatingNumber evaluation={film.voteAverage} />
        </div>
        <Rate
          allowHalf
          defaultValue={film.voteAverage}
          count={10}
          style={{ fontSize: '15px' }}
          onChange={(newRating) => onRatingChange(film.id, newRating)}
        />
      </div>
      <img
        className="movie__poster"
        width="183"
        height="281"
        alt="Movie poster"
        src={`https://image.tmdb.org/t/p/original${film.posterPath ? film.posterPath : ''}`}
      />
    </li>
  );
}

export default Movie;
