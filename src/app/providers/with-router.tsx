import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Hoc } from 'shared/types';

export const withRouter: Hoc = (Component) => (props) =>
  (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <Component {...props} />
      </Suspense>
    </BrowserRouter>
  );
