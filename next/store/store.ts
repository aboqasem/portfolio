import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { __PROD__ } from '@/common/constants';

import rootReducer from './rootReducer';

let enhancer = applyMiddleware(thunk);

if (!__PROD__) {
  enhancer = composeWithDevTools(enhancer);
}

const store = createStore(rootReducer, enhancer);

export default store;
