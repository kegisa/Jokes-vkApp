import * as appActions from '@store/app/app.actions';
import {FetchedUser} from '@models';

export interface AppState {
    isFetching: boolean;
    fetchedUser: FetchedUser | null;
    feedScrollPosition: number;
    likeScrollPosition: number;
}

const initialState: AppState = {
    isFetching: false,
    fetchedUser: null,
    feedScrollPosition: 0,
    likeScrollPosition: 0,
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
        case appActions.SAVE_SCROLL_POSITION:
            const scrollName = `${action.payload.view}ScrollPosition`;
            return {
                ...state,
                [scrollName]: action.payload.scrollPosition,
            };
    }
};
