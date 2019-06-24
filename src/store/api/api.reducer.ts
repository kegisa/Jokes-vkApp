import * as apiActions from '@store/api/api.actions';
import {IAnecdote} from '@models';

export interface ApiState {
    isFetching: boolean;
    jokes: IAnecdote[];
}

const initialState: ApiState = {
    isFetching: false,
    jokes: [],
};

export const apiReducer = (
    state = initialState,
    action: apiActions.Actions
): ApiState => {
    switch (action.type) {
        case apiActions.START_FETCHING_ANECDOTES:
            return {
                ...state,
                isFetching: true,
            };
        case apiActions.FINISH_FETCHING_ANECDOTES:
            return {
                ...state,
                isFetching: false,
                jokes: action.payload,
            };
        default:
            return state;
    }
};
