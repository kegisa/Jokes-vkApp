import * as appActions from '@store/app/app.actions';

export interface AppState {
}

const initialState: AppState = {};

export const appReducer = (
    state = initialState,
    action: appActions.Actions
): AppState => {
    // switch (action.type) {
    //     default:
    //         return state;
    // }
    return state;
};
