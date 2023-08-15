import { TServerFilmsResponseBody, TGenre, TFilmsResponseBody, TGenresResponseBody } from '../types';

import { responseBodyAdapter } from './adapter';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGJmMjc4YjJhMmM5YzM5MDg5NDU1NjI0NmYwMGY1OCIsInN1YiI6IjY0ZDExMTFmZDlmNGE2MDNiNmM5OWRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LY31xUNq66U6OQup74jwYxtd8Hi_FHTJW45UqOlPtGs';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AUTH_TOKEN,
  },
};

async function getResponse<T>(response: Response): Promise<T> {
  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.status_message}`);
  }

  return await response.json();
}

export async function getFilmsByQuery(query: string, page: number = 1): Promise<TFilmsResponseBody> {
  const response = await fetch(`${BASE_URL}?query=${query}&include_adult=false&language=en-US&page=${page}`, options);

  const serverResponseBody = await getResponse<TServerFilmsResponseBody>(response);
  const responseBody = responseBodyAdapter(serverResponseBody);
  return responseBody;
}

export async function getRandomFilms(page: number = 1): Promise<TFilmsResponseBody> {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options
  );

  const serverResponseBody = await getResponse<TServerFilmsResponseBody>(response);
  const responseBody = responseBodyAdapter(serverResponseBody);
  return responseBody;
}

export async function getMovieGenresList(): Promise<TGenre[]> {
  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);

  const serverResponseBody = await getResponse<TGenresResponseBody>(response);
  const genres: TGenre[] = serverResponseBody.genres;
  return genres;
}
