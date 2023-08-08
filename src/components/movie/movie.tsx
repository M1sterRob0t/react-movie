import format from 'date-fns/format';

import { TFilm } from '../../types/film';
import { hideLongDescription } from '../../utils';

const MAX_DESC_LENGTH = 150;

interface IMovie {
  film: TFilm;
}

function Movie({ film }: IMovie): JSX.Element {
  const filmDate = format(new Date(film.releaseDate), 'MMMM d, yyyy');
  return (
    <li className="movies__item movie">
      <div className="movie__content">
        <h3 className="movie__title">{film.title}</h3>
        <h4 className="movie__date">{filmDate}</h4>
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
      <img
        className="movie__poster"
        width="183"
        height="281"
        alt="Movie poster"
        src={`https://image.tmdb.org/t/p/original${film.posterPath}`}
      />
    </li>
  );
}

export default Movie;
