const { Text } = Typography;
import { Space, Typography } from 'antd';

import Movie from '../movie';
import { TFilm } from '../../types/film';
import './movies-list.css';

interface IMoviesList {
  films: TFilm[];
}

function MoviesList({ films }: IMoviesList): JSX.Element {
  return (
    <ul className="movies__list">
      {films.length ? (
        films.map((film) => <Movie film={film} key={film.id} />)
      ) : (
        <Space direction="vertical" style={{ textAlign: 'center', width: '100%' }}>
          <Text type="secondary">There are no films matching your request.</Text>
        </Space>
      )}
    </ul>
  );
}

export default MoviesList;
