import { Space, Typography } from 'antd';

import Movie from '../movie';
import { TFilm } from '../../types/film';
import './movies-list.css';

const { Text } = Typography;

interface IMoviesList {
  films: TFilm[];
  onRatingChange: (movieId: number, newRating: number) => void;
}

function MoviesList({ films, onRatingChange }: IMoviesList): JSX.Element {
  return (
    <ul className="movies__list">
      {films.length ? (
        films.map((film) => {
          return <Movie film={film} key={film.id} onRatingChange={onRatingChange} />;
        })
      ) : (
        <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
          <Text type="secondary">There are no films matching your request.</Text>
        </Space>
      )}
    </ul>
  );
}

export default MoviesList;
