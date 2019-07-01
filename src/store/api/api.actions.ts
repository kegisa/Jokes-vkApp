import axios from 'axios';
import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import {API_URL} from '../../shared/GlobalConsts';
import {IAnecdote} from '@models';

export const START_FETCHING_ANECDOTES = '[API] START_FETCHING_ANECDOTES';
export const FINISH_FETCHING_ANECDOTES = '[API] FINISH_FETCHING_ANECDOTES';
export const START_FETCHING_LIKED_ANECDOTES = '[API] START_FETCHING_LIKED_ANECDOTES';
export const FINISH_FETCHING_LIKED_ANECDOTES = '[API] FINISH_FETCHING_LIKED_ANECDOTES';
export const TOGGLE_LIKE = '[API] TOGGLE_LIKE';
export const START_ANECDOTE_SHARING = '[API] START_ANECDOTE_SHARING';
export const FINISH_ANECDOTE_SHARING = '[API] FINISH_ANECDOTE_SHARING';

export const Actions = {
        startFetchingAnecdotes: () => createAction(START_FETCHING_ANECDOTES),
        finishFetchingAnecdotes: (data: IAnecdote[]) => createAction(FINISH_FETCHING_ANECDOTES, data),
        startFetchingLikedAnecdotes: () => createAction(START_FETCHING_LIKED_ANECDOTES),
        finishFetchingLikedAnecdotes: (data: IAnecdote[]) => createAction(FINISH_FETCHING_LIKED_ANECDOTES, data),
        toggleLike: (anek: any) => createAction(TOGGLE_LIKE, anek),
        startSharingAnecdote: () => createAction(START_ANECDOTE_SHARING),
        finishSharingAnecdote: () => createAction(FINISH_ANECDOTE_SHARING),
    }
;

export const Thunks = {
    getAnecdotes: (userId?: string) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingAnecdotes());
            const id = userId && userId !== '' && userId !== undefined ?
                userId
                :
                '99444331';
            const promise = axios.get(`${API_URL}db?user_id=${id}`);
            promise.then((response: any) => {
                let data = response.data.map(
                    (anecdote: any) => {
                        if (anecdote.id) {
                            return anecdote;
                        }
                    }
                );
                data = data.filter(anecdote => anecdote !== undefined);
                dispatch(Actions.finishFetchingAnecdotes(data));
            });
        };
    },
    getLikedAnecdotes: (userId?: string) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingLikedAnecdotes());
            const id = userId && userId !== '' && userId !== undefined ?
                userId
                :
                '99444331';
            const promise = axios.get(`${API_URL}getlikes?user_id=${id}`);
            promise.then((response: any) => {
                let data = response.data.map(
                    (anecdote: any) => {
                        if (anecdote.id) {
                            return anecdote;
                        }
                    }
                );
                data = data.filter(anecdote => anecdote !== undefined);
                dispatch(Actions.finishFetchingLikedAnecdotes(data));
            });
        };
    },
    toggleLike: (userId: string, anecdoteId: string, currentView: string) => {
        return (dispatch: Dispatch) => {
            const parsedUserId = userId && userId !== '' && userId !== undefined ?
                userId
                :
                '99444331';

            const promise = axios.post(`${API_URL}likeswitch`, `user_id=${parsedUserId}&anek_id=${anecdoteId}`);
            promise.then(
                (response: any) => {
                    let anek = response.data[1];
                    anek = {
                        ...anek,
                        currentView: currentView,
                    };
                    dispatch(Actions.toggleLike(anek));
                }
            );
        };
    },
    uploadAnecdote: (userId: string, anecdoteText: string, isAnonymous: boolean, username: string) => {
        return (dispatch: Dispatch) => {
            const parsedUserId = userId && userId !== '' && userId !== undefined ?
                userId
                :
                '99444331';
            const parsedUsername = username && username !== '' && username !== undefined ?
                username
                :
                'test';
            const promise = axios.post(
                `${API_URL}suggest`,
                `userId=${parsedUserId}&text=${anecdoteText}&isAnon=${isAnonymous}&username=${parsedUsername}`);
            promise.then(
                (response: any) => {
                    if (response.status === 200) {
                        dispatch(Actions.finishSharingAnecdote());
                    }
                }
            );
        };
    },
    // TODO: костыль
    toggleFlag: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startSharingAnecdote());
        };
    },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
