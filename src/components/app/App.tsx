import { useState, useEffect } from 'react';

import MoviesList from '../movies-list/movies-list';
import { getData } from '../../services/api';
import { TFilm } from '../../types/film';

function App() {
  const [films, setFilms] = useState<TFilm[]>([]);
  useEffect(() => {
    getData()
      .then((data) => data.filter((film) => film.backdropPath))
      .then((data) => setFilms(data));
  }, []);

  return <MoviesList films={films} />;
}

export default App;
