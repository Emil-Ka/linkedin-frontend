import { Provider } from 'react-redux';

import { store } from 'redux/store';
import { Hoc } from 'shared/types';

export const withStore: Hoc = (Component) => (props) =>
  (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
