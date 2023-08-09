import { TFilm } from '../../types/film';
import { hideLongDescription } from '../../utils';
import './movie.css';
import Rating from '../rating/rating';

const MAX_DESC_LENGTH = 110;

interface IMovie {
  film: TFilm;
}

function Movie({ film }: IMovie): JSX.Element {
  return (
    <li className="movies__item movie">
      <div className="movie__content">
        <div className="movie__inner">
          <h3 className="movie__title">{film.title}</h3>
          <h4 className="movie__date">{film.releaseDate}</h4>
          <ul className="movie__genres-lsit">
            <li className="movie__genres-item">
              <button className="movie__genre">Action</button>
            </li>
            <li className="movie__genres-item">
              <button className="movie__genre">Drama</button>
            </li>
          </ul>
          <div className="movie__desc">{hideLongDescription(film.overview, MAX_DESC_LENGTH)}</div>
        </div>
        <Rating className="movie__rating" filmRating={film.voteAverage} />
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
