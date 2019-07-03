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

export const getLikedAnecdotes = createSelector(
    getApi,
    apiState => apiState.likedAnecdotes,
);

export const getIsFirstFetchingFeed = createSelector(
    getApi,
    apiState => apiState.isFirstFetchingFeedStarted,
);

export const getIsFirstFetchingLiked = createSelector(
    getApi,
    apiState => apiState.isFirstFetchingLikedStarted,
);
