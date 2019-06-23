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
