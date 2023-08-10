import { useState, useEffect } from 'react';
import _ from 'lodash';

import Spinner from '../spinner';
import MoviesList from '../movies-list';
import { getFilmsByQuery, getRandomFilms } from '../../services/api';
import { TFilm } from '../../types/film';
import './app.css';
import Popup from '../popup';
import Search from '../search';

const SEARCH_INPUT_DELAY = 500;

function App(): JSX.Element {
  const [isOffline, setOffline] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [films, setFilms] = useState<TFilm[]>([]);
  const [error, setErrorInfo] = useState<Error>();
  const [searchQuery, setSearchQuery] = useState('');

  console.log('rerender');
  function fetchData(fn: (query?: string) => Promise<TFilm[]>, argument: string = ''): void {
    fn(argument)
      .then((data) => data.filter((film) => film.backdropPath))
      .then((data) => setFilms(data))
      .then(() => setLoading(false))
      .then(() => setSearchQuery(argument))
      .catch((err: Error) => {
        setLoading(false);
        setError(true);
        setErrorInfo(err);
      });
  }

  const debauncedSearchInputChangeHandler = _.debounce((searchQuery: string) => {
    setLoading(true);
    if (searchQuery) fetchData(getFilmsByQuery, searchQuery);
    else fetchData(getRandomFilms);
  }, SEARCH_INPUT_DELAY);

  useEffect(() => {
    window.addEventListener('online', () => {
      document.title = document.title.replace('[offline]', '');
      setOffline(false);
    });

    window.addEventListener('offline', () => {
      document.title += ' [offline]';
      setOffline(true);
    });

    fetchData(getRandomFilms);
  }, []);

  if (isOffline) return <Popup offline />;
  //if (isLoading) return <Spin indicator={antIcon} />;
  if (isError && error) return <Popup type={'error'} name={error.name} message={error.message} />;

  return (
    <>
      <Search searchQuery={searchQuery} changeHandler={debauncedSearchInputChangeHandler} />
      {isLoading ? <Spinner /> : <MoviesList films={films} />}
    </>
  );
}

export default App;
