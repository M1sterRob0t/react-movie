import './genres-list.css';
import { TGenre } from '../../types';
import Genre from '../genre/genre';

interface IGenresProps {
  genres: TGenre[];
}

function GenresList({ genres }: IGenresProps): JSX.Element {
  return (
    <ul className="movie__genres-lsit">
      {genres.map((genre) => (
        <Genre genreName={genre.name} key={genre.id} />
      ))}
    </ul>
  );
}

export default GenresList;
