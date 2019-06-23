<<<<<<< HEAD
import {RootState} from '@store/state.types';

export const getApp = (state: RootState) => state.app;
=======
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
>>>>>>> a5f6a551af953e8550732714c89aac2b092c51fb
