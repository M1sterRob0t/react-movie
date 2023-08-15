import { createContext } from 'react';

import { TGenre } from '../../types/genre';

export const GenresContext = createContext<TGenre[]>([]);
