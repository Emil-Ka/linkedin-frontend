import { StrictMode } from 'react';

import { Hoc } from 'shared/types';

export const withStrictMode: Hoc = (Component) => (props) =>
  (
    <StrictMode>
      <Component {...props} />
    </StrictMode>
  );
