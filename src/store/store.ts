import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '@store/reducer';
import logger from 'redux-logger';

const middleware = applyMiddleware(thunk, logger);

export const store = createStore(reducer, {}, middleware);
