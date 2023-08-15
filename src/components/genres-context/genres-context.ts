import { createContext } from 'react';

import { TGenre } from '../../types';

export const GenresContext = createContext<TGenre[]>([]);
