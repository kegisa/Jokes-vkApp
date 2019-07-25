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

export const getIsErrorAtFeedLoadingExisting = createSelector(
    getApi,
    apiState => apiState.isErrorAtFeedLoadingExisting,
);

export const getIsErrorAtLikedLoadingExisting = createSelector(
    getApi,
    apiState => apiState.isErrorAtLikedLoadingExisting,
);

export const getIsErrorAtSharing = createSelector(
    getApi,
    apiState => apiState.isErrorAtSharing,
);

export const getIsAnecdoteSent = createSelector(
    getApi,
    apiState => apiState.isAnecdoteShared,
);

export const getTopUsers = createSelector(
    getApi,
    apiState => apiState.topUsers,
);
