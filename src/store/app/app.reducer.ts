import * as appActions from '@store/app/app.actions';
<<<<<<< HEAD

export interface AppState {
}

const initialState: AppState = {};
=======
import {FetchedUser} from '@models';

export interface AppState {
    isFetching: boolean;
    fetchedUser: Partial<FetchedUser>;
}

const initialState: AppState = {
    isFetching: false,
    fetchedUser: {},
};
>>>>>>> a5f6a551af953e8550732714c89aac2b092c51fb

export const appReducer = (
    state = initialState,
    action: appActions.Actions
): AppState => {
<<<<<<< HEAD
    // switch (action.type) {
    //     default:
    //         return state;
    // }
    return state;
=======
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
>>>>>>> a5f6a551af953e8550732714c89aac2b092c51fb
};
