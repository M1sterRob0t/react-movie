import { TFilm } from '../types/film';
import { TServerFilm } from '../types/serverFilm';
import { TServerResponse } from '../types/server-response';

import { filmAdapter } from './adapter';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGJmMjc4YjJhMmM5YzM5MDg5NDU1NjI0NmYwMGY1OCIsInN1YiI6IjY0ZDExMTFmZDlmNGE2MDNiNmM5OWRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LY31xUNq66U6OQup74jwYxtd8Hi_FHTJW45UqOlPtGs';

export async function getFilmsByQuery(query: string = '1'): Promise<TFilm[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_TOKEN,
    },
  };

  const response = await fetch(`${BASE_URL}?query=${query}&include_adult=false&language=en-US&page=1`, options);
  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.status_message}`);
  }

  const serverResponse: TServerResponse = await response.json();
  const data: TFilm[] = serverResponse.results.map((el: TServerFilm) => filmAdapter(el));

  return data;
}

export async function getRandomFilms(): Promise<TFilm[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_TOKEN,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    options
  );
  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.status_message}`);
  }

  const serverResponse: TServerResponse = await response.json();
  const data: TFilm[] = serverResponse.results.map((el: TServerFilm) => filmAdapter(el));

  return data;
}
