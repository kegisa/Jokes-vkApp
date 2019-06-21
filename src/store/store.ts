import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from '@store/reducer';

const middleware = applyMiddleware(thunk);

export const store = createStore(reducer, {}, middleware);
