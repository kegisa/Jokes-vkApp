import * as apiActions from '@store/api/api.actions';
import { IAnecdote, UserTop } from '@models';

export interface ApiState {
    isFetching: boolean;
    jokes: IAnecdote[];
    likedAnecdotes: IAnecdote[];
    isAnecdoteShared: boolean;
    isFirstFetchingFeedStarted: boolean;
    isFirstFetchingLikedStarted: boolean;
    isErrorAtFeedLoadingExisting: boolean;
    isErrorAtLikedLoadingExisting: boolean;
    isErrorAtSharing: boolean;
    isErrorFetchingTopUsers: boolean;
    topUsers: UserTop[];
}

const initialState: ApiState = {
    isFetching: false,
    jokes: [],
    isFirstFetchingFeedStarted: true,
    likedAnecdotes: [],
    isAnecdoteShared: false,
    isFirstFetchingLikedStarted: true,
    isErrorAtFeedLoadingExisting: false,
    isErrorAtLikedLoadingExisting: false,
    isErrorAtSharing: false,
    isErrorFetchingTopUsers: false,
    topUsers: [],
}
    ;

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
                isFirstFetchingFeedStarted: false,
            };
        case apiActions.START_FETCHING_LIKED_ANECDOTES:
            return {
                ...state,
                isFetching: true,
            };
        case apiActions.START_FETCHING_TOP_USERS:
            return {
                ...state,
                isFetching: true,
            };
        case apiActions.FINISH_FETCHING_LIKED_ANECDOTES:
            return {
                ...state,
                isFetching: false,
                likedAnecdotes: action.payload,
                isFirstFetchingLikedStarted: false,
                isErrorAtFeedLoadingExisting: false,
                isErrorAtLikedLoadingExisting: false,
            };
        case apiActions.FINISH_FETCHING_TOP_USERS:
            return {
                ...state,
                isFetching: false,
                topUsers: action.payload,
                isErrorFetchingTopUsers: false,
            };
        case apiActions.TOGGLE_LIKE:
            const anekId = parseInt(action.payload.anek, 10);
            const isLiked = action.payload.status === 'on';
            const jokes = state.jokes.map(anecdote => {
                if (anecdote.id === anekId) {
                    return {
                        ...anecdote,
                        isLiked: isLiked,
                        likes: isLiked ? anecdote.likes + 1 : anecdote.likes - 1,
                    };
                }
                return anecdote;
            });
            const likedJokes = state.likedAnecdotes.map(anecdote => {
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
                jokes: jokes,
                likedAnecdotes: likedJokes,
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
                isErrorAtSharing: false,
            };
        case apiActions.ERROR_FETCHING_ANECDOTES:
            return {
                ...state,
                isErrorAtFeedLoadingExisting: true,
            };
        case apiActions.ERROR_FETCHING_LIKED_ANECDOTES:
            return {
                ...state,
                isErrorAtLikedLoadingExisting: true,
            };
        case apiActions.ERROR_SHARING_ANECDOTES:
            return {
                ...state,
                isErrorAtSharing: true,
            };
        default:
            return state;
    }
};
