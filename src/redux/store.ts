import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import { __DEV__ } from '../constants';

let enhancer = applyMiddleware(thunk);

if (__DEV__) {
  enhancer = composeWithDevTools(applyMiddleware(thunk, logger));
}

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
