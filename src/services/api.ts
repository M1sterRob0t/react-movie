import { TFilm } from '../types/film';
import { TServerFilm } from '../types/serverFilm';
import { TServerResponse } from '../types/server-response';

import { filmAdapter } from './adapter';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const QUERY_STRING = '?query=1&include_adult=false&language=en-US&page=2';
const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGJmMjc4YjJhMmM5YzM5MDg5NDU1NjI0NmYwMGY1OCIsInN1YiI6IjY0ZDExMTFmZDlmNGE2MDNiNmM5OWRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LY31xUNq66U6OQup74jwYxtd8Hi_FHTJW45UqOlPtGs';

export async function getData(): Promise<TFilm[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_TOKEN,
    },
  };

  const response = await fetch(`${BASE_URL}${QUERY_STRING}`, options);
  const serverResponse: TServerResponse = await response.json();
  const data: TFilm[] = serverResponse.results.map((el: TServerFilm) => filmAdapter(el));

  return data;
}
