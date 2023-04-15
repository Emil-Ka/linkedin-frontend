import { AppRouter } from 'pages';

import { withProviders } from './providers';
import './index.scss';

export const App = withProviders(AppRouter);
