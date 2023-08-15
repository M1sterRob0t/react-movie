import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Pagination } from 'antd';

import Spinner from '../spinner';
import MoviesList from '../movies-list';
import {
  getFilmsByQuery,
  getRandomFilms,
  getGuestSessionId,
  getRatedFilms,
  postRatingToFilm,
  getMovieGenresList,
} from '../../services/api';
import { TFilm } from '../../types/film';
import './app.css';
import Popup from '../popup';
import Search from '../search';
import { TData } from '../../types/data';
import NavTabs from '../nav-tabs';
import { Tab } from '../../const';
import { TGenre } from '../../types/genre';
import { GenresContext } from '../genres-context/genres-context';

const SEARCH_INPUT_DELAY = 500;
const MAX_PAGE_NUMBER = 500;
const MAX_RESULTS = 10000;
const FILMS_PER_PAGE = 20;
const DEFAULT_PAGE = 1;

function App(): JSX.Element {
  const [isOffline, setOffline] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [films, setFilms] = useState<TFilm[]>([]);
  const [error, setErrorInfo] = useState<Error>();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setPage] = useState(DEFAULT_PAGE);
  const [totalResults, setTotalResults] = useState<number>();
  const [currentTab, setTab] = useState<string>(Tab.Search);
  const [guestSessionId, setSessiontId] = useState<string>('');
  const [genres, setGenres] = useState<TGenre[]>([]);

  function filmRateChangeHandler(movieId: number, newRating: number): void {
    postRatingToFilm(movieId, guestSessionId, newRating);
  }

  function tabChangeHandler(newTab: string) {
    if (newTab === currentTab) return;
    else if (newTab === Tab.Search) fetchData(getRandomFilms.bind(null, DEFAULT_PAGE));
    else if (newTab === Tab.Rated) fetchData(getRatedFilms.bind(null, guestSessionId, DEFAULT_PAGE));

    setTab(newTab);
  }

  function fetchData(fn: () => Promise<TData>, query: string = '') {
    setLoading(true);

    fn()
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
    if (searchQuery) fetchData(getFilmsByQuery.bind(null, searchQuery, DEFAULT_PAGE), searchQuery);
    else fetchData(getRandomFilms.bind(currentPage));
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

    fetchData(getRandomFilms.bind(null, currentPage));
    getMovieGenresList().then((genres) => setGenres(genres));
    getGuestSessionId().then((id: string) => setSessiontId(id));
  }, []);

  if (isOffline) return <Popup offline />;
  if (isError && error) return <Popup type={'error'} name={error.name} message={error.message} />;

  return (
    <>
      <NavTabs onChnage={tabChangeHandler} />
      {currentTab === Tab.Search ? (
        <Search searchQuery={searchQuery} changeHandler={debauncedSearchInputChangeHandler} />
      ) : null}
      {isLoading ? (
        <Spinner />
      ) : (
        <GenresContext.Provider value={genres}>
          <MoviesList films={films} onRatingChange={filmRateChangeHandler} />
          <Pagination
            style={{ textAlign: 'center' }}
            defaultCurrent={currentPage}
            pageSize={FILMS_PER_PAGE}
            total={totalResults}
            onChange={(page) =>
              searchQuery
                ? fetchData(getFilmsByQuery.bind(null, searchQuery, page), searchQuery)
                : fetchData(getRandomFilms.bind(null, page))
            }
            showSizeChanger={false}
          />
        </GenresContext.Provider>
      )}
    </>
  );
}

export default App;
