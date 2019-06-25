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
        case apiActions.TOGGLE_LIKE:
            const anekId = parseInt(action.payload.anek, 10);
            const isLiked = action.payload.status === 'on';
            const jokes = state.jokes.map(anecdote => {
                if (anecdote.id === anekId) {
                    return {
                        ...anecdote,
                        like: isLiked,
                        likes: isLiked ? anecdote.likes + 1 : anecdote.likes - 1,
                    };
                }
                return anecdote;
            });
            return {
                ...state,
                jokes: jokes,
            };
        default:
            return state;
    }
};
