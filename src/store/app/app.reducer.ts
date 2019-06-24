import * as appActions from '@store/app/app.actions';
import {FetchedUser} from '@models';

export interface AppState {
    isFetching: boolean;
    fetchedUser: FetchedUser | null;
}

const initialState: AppState = {
    isFetching: false,
    fetchedUser: null,
};

export const appReducer = (
    state = initialState,
    action: appActions.Actions
): AppState => {
    switch (action.type) {
        case appActions.START_FETCHING_USER_INFO:
            return {
                ...state,
                isFetching: true,
            };
        case appActions.FINISH_FETCHING_USER_INFO:
            return {
                ...state,
                isFetching: false,
                fetchedUser: action.payload,
            };
        default:
            return state;
    }
};
