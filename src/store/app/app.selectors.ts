import {createSelector} from 'reselect';
import {RootState} from '@store/state.types';

export const getApp = (state: RootState) => state.app;

export const getFetching = createSelector(
    getApp,
    appState => appState.isFetching,
);

export const getFetchedUser = createSelector(
    getApp,
    appState => appState.fetchedUser,
);

export const getFeedScrollPosition = createSelector(
    getApp,
    appState => appState.feedScrollPosition,
);

export const getLikeScrollPosition = createSelector(
    getApp,
    appState => appState.likeScrollPosition,
);
