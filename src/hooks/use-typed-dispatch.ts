import { useDispatch } from 'react-redux';

import { DispatchType } from '../redux/store';

export const useTypedDispatch = () => useDispatch<DispatchType>();
