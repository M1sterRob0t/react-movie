import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import MoviesList from '../movies-list';
import { getData } from '../../services/api';
import { TFilm } from '../../types/film';
import './app.css';
import Popup from '../popup';

const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;

function App(): JSX.Element {
  const [isOffline, setOffline] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [films, setFilms] = useState<TFilm[]>([]);
  const [error, setErrorInfo] = useState<Error>();

  useEffect(() => {
    window.addEventListener('online', () => {
      document.title = document.title.replace('[offline]', '');
      setOffline(false);
    });

    window.addEventListener('offline', () => {
      document.title += ' [offline]';
      setOffline(true);
    });

    getData()
      .then((data) => data.filter((film) => film.backdropPath))
      .then((data) => setFilms(data))
      .then(() => setLoading(false))
      .catch((err: Error) => {
        setLoading(false);
        setError(true);
        setErrorInfo(err);
      });
  }, []);

  if (isOffline) return <Popup offline />;
  if (isLoading) return <Spin indicator={antIcon} />;
  if (isError && error) return <Popup type={'error'} name={error.name} message={error.message} />;

  return <MoviesList films={films} />;
}

export default App;
