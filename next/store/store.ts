import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { __PROD__ } from '@/common/constants';

let enhancer = applyMiddleware(thunk);

if (!__PROD__) {
  enhancer = composeWithDevTools(enhancer);
}

const store = createStore(rootReducer, enhancer);

export default store;
