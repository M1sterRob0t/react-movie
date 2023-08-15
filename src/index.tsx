import ReactDOM from 'react-dom/client';

import App from './components/app';
import AppStorage from './services/storage';
import { TFilm } from './types/film';

const ratedFilmsStorage = new AppStorage<TFilm>('rated-films', window.localStorage);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App ratedFilmsStorage={ratedFilmsStorage} />);
