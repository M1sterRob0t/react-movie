import { TFilm } from '../../types/film';
import Movie from '../movie';
import './movies-list.css';

interface IMoviesList {
  films: TFilm[];
}

function MoviesList({ films }: IMoviesList): JSX.Element {
  return (
    <ul className="movies__list">
      {films.map((film) => (
        <Movie film={film} key={film.id} />
      ))}
    </ul>
  );
}

export default MoviesList;
