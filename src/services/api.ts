import { TData } from '../types/data';
import { TServerFilm } from '../types/serverFilm';
import { TServerResponse } from '../types/server-response';
import { TGenre } from '../types/genre';

import { filmAdapter } from './adapter';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGJmMjc4YjJhMmM5YzM5MDg5NDU1NjI0NmYwMGY1OCIsInN1YiI6IjY0ZDExMTFmZDlmNGE2MDNiNmM5OWRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LY31xUNq66U6OQup74jwYxtd8Hi_FHTJW45UqOlPtGs';

export async function getFilmsByQuery(query: string, page: number = 1): Promise<TData> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_TOKEN,
    },
  };

  const response = await fetch(`${BASE_URL}?query=${query}&include_adult=false&language=en-US&page=${page}`, options);
  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.status_message}`);
  }

  const serverResponse: TServerResponse = await response.json();
  const data: TData = {
    films: serverResponse.results.map((el: TServerFilm) => filmAdapter(el)),
    page: serverResponse.page,
    results: serverResponse.total_results,
    totalPages: serverResponse.total_pages,
  };

  return data;
}

export async function getRandomFilms(page: number = 1): Promise<TData> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_TOKEN,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options
  );
  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.status_message}`);
  }

  const serverResponse: TServerResponse = await response.json();
  const data: TData = {
    films: serverResponse.results.map((el: TServerFilm) => filmAdapter(el)),
    page: serverResponse.page,
    results: serverResponse.total_results,
    totalPages: serverResponse.total_pages,
  };

  return data;
}

export async function getGuestSessionId(): Promise<string> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_TOKEN,
    },
  };

  const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options);
  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.status_message}`);
  }

  const serverResponse = await response.json();
  console.log(serverResponse);
  const data: string = serverResponse.guest_session_id;

  return data;
}

export async function getRatedFilms(sessionId: string, page: number = 1): Promise<TData> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_TOKEN,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
    options
  );
  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.status_message}`);
  }

  const serverResponse: TServerResponse = await response.json();
  const data: TData = {
    films: serverResponse.results.map((el: TServerFilm) => filmAdapter(el)),
    page: serverResponse.page,
    results: serverResponse.total_results,
    totalPages: serverResponse.total_pages,
  };

  return data;
}

export async function postRatingToFilm(movieId: number, sessionId: string, rating: number) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: AUTH_TOKEN,
    },
    body: JSON.stringify({
      value: rating,
    }),
  };

  fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

export async function getMovieGenresList(): Promise<TGenre[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_TOKEN,
    },
  };

  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.status_message}`);
  }

  const serverResponse = await response.json();
  const genres: TGenre[] = serverResponse.genres;
  return genres;
}
