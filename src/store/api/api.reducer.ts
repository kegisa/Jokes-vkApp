import * as apiActions from '@store/api/api.actions';
import {IAnecdote} from '@models';
import {FEED_VIEW} from '../../shared/GlobalConsts';

export interface ApiState {
    isFetching: boolean;
    jokes: IAnecdote[];
    likedAnecdotes: IAnecdote[];
    isAnecdoteShared: boolean;
}

const initialState: ApiState = {
    isFetching: false,
    jokes: [],
    likedAnecdotes: [],
    isAnecdoteShared: false,
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
        case apiActions.START_FETCHING_LIKED_ANECDOTES:
            return {
                ...state,
                isFetching: true,
            };
        case apiActions.FINISH_FETCHING_LIKED_ANECDOTES:
            return {
                ...state,
                isFetching: false,
                likedAnecdotes: action.payload,
            };
        case apiActions.TOGGLE_LIKE:

            const anekId = parseInt(action.payload.anek, 10);
            const isLiked = action.payload.status === 'on';
            const currentView = action.payload.currentView;
            const anecdoteType = currentView === FEED_VIEW ? 'jokes' : 'likedAnecdotes';
            const jokes = state[anecdoteType].map(anecdote => {
                if (anecdote.id === anekId) {
                    return {
                        ...anecdote,
                        isLiked: isLiked,
                        likes: isLiked ? anecdote.likes + 1 : anecdote.likes - 1,
                    };
                }
                return anecdote;
            });
            return {
                ...state,
                [anecdoteType]: jokes,
            };
        case apiActions.START_ANECDOTE_SHARING:
            return {
                ...state,
                isAnecdoteShared: false,
            };
        case apiActions.FINISH_ANECDOTE_SHARING:
            return {
                ...state,
                isAnecdoteShared: true,
            };
        default:
            return state;
    }
};
