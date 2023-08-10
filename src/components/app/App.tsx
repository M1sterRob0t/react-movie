import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Pagination } from 'antd';

import Spinner from '../spinner';
import MoviesList from '../movies-list';
import { getFilmsByQuery, getRandomFilms } from '../../services/api';
import { TFilm } from '../../types/film';
import './app.css';
import Popup from '../popup';
import Search from '../search';
import { TData } from '../../types/data';

const SEARCH_INPUT_DELAY = 500;
const MAX_PAGE_NUMBER = 500;
const MAX_RESULTS = 10000;
const FILMS_PER_PAGE = 20;

function App(): JSX.Element {
  const [isOffline, setOffline] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [films, setFilms] = useState<TFilm[]>([]);
  const [error, setErrorInfo] = useState<Error>();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState<number>();

  function fetchData(fn: (query?: string, page?: number) => Promise<TData>, query: string = '', page: number): void {
    setLoading(true);
    fn(query, page)
      .then((data) => {
        setPage(data.page);
        setTotalResults(data.results);
        data.results / FILMS_PER_PAGE <= MAX_PAGE_NUMBER ? setTotalResults(data.results) : setTotalResults(MAX_RESULTS);
        return data.films;
      })
      .then((films) => films.filter((film) => film.backdropPath))
      .then((films) => setFilms(films))
      .then(() => setLoading(false))
      .then(() => setSearchQuery(query))
      .catch((err: Error) => {
        setLoading(false);
        setError(true);
        setErrorInfo(err);
      });
  }

  const debauncedSearchInputChangeHandler = _.debounce((searchQuery: string) => {
    if (searchQuery) fetchData(getFilmsByQuery, searchQuery, 1);
    else fetchData(getRandomFilms, '', currentPage);
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

    fetchData(getRandomFilms, searchQuery, currentPage);
  }, []);

  if (isOffline) return <Popup offline />;
  if (isError && error) return <Popup type={'error'} name={error.name} message={error.message} />;
  return (
    <>
      <Search searchQuery={searchQuery} changeHandler={debauncedSearchInputChangeHandler} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <MoviesList films={films} />
          <Pagination
            style={{ textAlign: 'center' }}
            defaultCurrent={currentPage}
            pageSize={FILMS_PER_PAGE}
            total={totalResults}
            onChange={(page) =>
              searchQuery ? fetchData(getFilmsByQuery, searchQuery, page) : fetchData(getRandomFilms, searchQuery, page)
            }
            showSizeChanger={false}
          />
        </>
      )}
    </>
  );
}

export default App;
