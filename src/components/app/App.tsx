import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Pagination } from 'antd';

import Spinner from '../spinner';
import MoviesList from '../movies-list';
import { getFilmsByQuery, getRandomFilms, getMovieGenresList } from '../../services/api';
import './app.css';
import Popup from '../popup';
import Search from '../search';
import NavTabs from '../nav-tabs';
import { Tab } from '../../const';
import { GenresContext } from '../genres-context/genres-context';
import AppStorage from '../../services/storage';
import { TGenre, TFilm, TFilmsResponseBody } from '../../types';

const SEARCH_INPUT_DELAY = 500;
const MAX_PAGE_NUMBER = 500;
const MAX_RESULTS = 10000;
const FILMS_PER_PAGE = 20;
const DEFAULT_PAGE = 1;

interface IAppProps {
  ratedFilmsStorage: AppStorage<TFilm>;
}

function App({ ratedFilmsStorage }: IAppProps): JSX.Element {
  const [isOffline, setOffline] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [films, setFilms] = useState<TFilm[]>([]);
  const [error, setErrorInfo] = useState<Error>();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setPage] = useState(DEFAULT_PAGE);
  const [totalResults, setTotalResults] = useState<number>();
  const [currentTab, setTab] = useState<string>(Tab.Search);
  const [genres, setGenres] = useState<TGenre[]>([]);

  function fetchData(fn: () => Promise<TFilmsResponseBody>, query: string = '') {
    setLoading(true);

    fn()
      .then((data) => {
        setPage(data.page);
        setTotalResults(data.totalResults);
        data.totalResults / FILMS_PER_PAGE <= MAX_PAGE_NUMBER
          ? setTotalResults(data.totalResults)
          : setTotalResults(MAX_RESULTS);
        return data.results;
      })
      .then((films) => films.filter((film) => film.backdropPath))
      .then((films) =>
        films.map((film) => {
          const ratedFilm = ratedFilmsStorage.getItems().find((ratedFilm) => ratedFilm.id === film.id);
          return ratedFilm ? ratedFilm : film;
        })
      )
      .then((films) => setFilms(films))
      .then(() => setLoading(false))
      .then(() => setSearchQuery(query))
      .catch((err: Error) => {
        setLoading(false);
        setError(true);
        setErrorInfo(err);
      });
  }

  function tabChangeHandler(newTab: string) {
    if (newTab === currentTab) return;
    else if (newTab === Tab.Search) fetchData(getRandomFilms.bind(null, DEFAULT_PAGE));
    else if (newTab === Tab.Rated) {
      const ratedFilms = ratedFilmsStorage.getItems();
      setPage(DEFAULT_PAGE);
      setTotalResults(ratedFilms.length);
      setFilms(ratedFilms.slice(0, FILMS_PER_PAGE));
    }

    setTab(newTab);
  }

  function filmRateChangeHandler(movieId: number, newRating: number): void {
    const index = films.findIndex((film) => film.id === movieId);
    const newFilm = Object.assign({}, films[index]);
    newFilm.rating = newRating;
    const updatedFilms = [...films.slice(0, index), newFilm, ...films.slice(index + 1)];
    setFilms(updatedFilms);

    const storagedFilms = ratedFilmsStorage.getItems();
    const storageIndex = storagedFilms.findIndex((film) => film.id === movieId);

    if (~storageIndex) storagedFilms[storageIndex] = newFilm;
    else storagedFilms.unshift(newFilm);

    ratedFilmsStorage.setItems(storagedFilms);
  }

  function paginationChangeHandler(page: number): void {
    if (currentTab === Tab.Search && searchQuery) {
      fetchData(getFilmsByQuery.bind(null, searchQuery, page), searchQuery);
    } else if (currentTab === Tab.Search && !searchQuery) {
      fetchData(getRandomFilms.bind(null, page));
    } else {
      const startIndex = (page - 1) * FILMS_PER_PAGE;
      const endIndex = startIndex + FILMS_PER_PAGE;
      const filmsOnPage = ratedFilmsStorage.getItems().slice(startIndex, endIndex);

      setPage(page);
      setFilms(filmsOnPage);
    }
  }

  const debauncedSearchInputChangeHandler = _.debounce((searchQuery: string) => {
    if (searchQuery) fetchData(getFilmsByQuery.bind(null, searchQuery, DEFAULT_PAGE), searchQuery);
    else fetchData(getRandomFilms.bind(null, currentPage));
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
            onChange={paginationChangeHandler}
            showSizeChanger={false}
          />
        </GenresContext.Provider>
      )}
    </>
  );
}

export default App;
