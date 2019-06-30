import {createSelector} from 'reselect';
import {RootState} from '@store/state.types';

export const getApi = (state: RootState) => state.api;

export const getFetching = createSelector(
    getApi,
    apiState => apiState.isFetching,
);

export const getJokes = createSelector(
    getApi,
    apiState => apiState.jokes,
);

export const getAnecdoteShared = createSelector(
    getApi,
    apiState => apiState.isAnecdoteShared,
);
