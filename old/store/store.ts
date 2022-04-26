import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { __PROD__ } from '@/common/constants';

import rootReducer from './rootReducer';

const store = createStore(rootReducer, __PROD__ ? undefined : composeWithDevTools());

export default store;
