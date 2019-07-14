import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import {API_URL, IS_DEV_MODE} from '../../shared/GlobalConsts';
import {IAnecdote} from '@models';
import {customAxiosRequest} from '../../shared/wrappers/axios';

export const START_FETCHING_ANECDOTES = '[API] START_FETCHING_ANECDOTES';
export const FINISH_FETCHING_ANECDOTES = '[API] FINISH_FETCHING_ANECDOTES';
export const ERROR_FETCHING_ANECDOTES = '[API] ERROR_FETCHING_ANECDOTES';
export const START_FETCHING_LIKED_ANECDOTES = '[API] START_FETCHING_LIKED_ANECDOTES';
export const FINISH_FETCHING_LIKED_ANECDOTES = '[API] FINISH_FETCHING_LIKED_ANECDOTES';
export const ERROR_FETCHING_LIKED_ANECDOTES = '[API] ERROR_FETCHING_LIKED_ANECDOTES';
export const TOGGLE_LIKE = '[API] TOGGLE_LIKE';
export const START_ANECDOTE_SHARING = '[API] START_ANECDOTE_SHARING';
export const FINISH_ANECDOTE_SHARING = '[API] FINISH_ANECDOTE_SHARING';
export const ERROR_SHARING_ANECDOTES = '[API] ERROR_SHARING_ANECDOTES';

export const Actions = {
        startFetchingAnecdotes: () => createAction(START_FETCHING_ANECDOTES),
        finishFetchingAnecdotes: (data: IAnecdote[]) => createAction(FINISH_FETCHING_ANECDOTES, data),
        errorFetchingAnecdotes: () => createAction(ERROR_FETCHING_ANECDOTES),
        startFetchingLikedAnecdotes: () => createAction(START_FETCHING_LIKED_ANECDOTES),
        finishFetchingLikedAnecdotes: (data: IAnecdote[]) => createAction(FINISH_FETCHING_LIKED_ANECDOTES, data),
        errorFetchingLikedAnecdotes: () => createAction(ERROR_FETCHING_LIKED_ANECDOTES),
        toggleLike: (anek: any) => createAction(TOGGLE_LIKE, anek),
        startSharingAnecdote: () => createAction(START_ANECDOTE_SHARING),
        finishSharingAnecdote: () => createAction(FINISH_ANECDOTE_SHARING),
        errorSharingAnecdote: () => createAction(ERROR_SHARING_ANECDOTES),
    }
;

export const Thunks = {
    getAnecdotes: (userId?: string) => {
        return (dispatch: Dispatch) => {
            if (IS_DEV_MODE || (userId && userId !== '' && userId !== undefined)) {
                const id = IS_DEV_MODE ? '99444331' : userId;
                dispatch(Actions.startFetchingAnecdotes());
                const promise = customAxiosRequest().get(`${API_URL}db?user_id=${id}`);
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
                }).catch(
                    (error: any) => {
                        if (error.response) {
                            dispatch(Actions.errorFetchingAnecdotes());
                        } else if (error.request) {
                            dispatch(Actions.errorFetchingAnecdotes());
                        } else {
                            dispatch(Actions.errorFetchingAnecdotes());
                        }
                    }
                );
            }
        };
    },
    getLikedAnecdotes: (userId?: string) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingLikedAnecdotes());
            const id = userId && userId !== '' && userId !== undefined ?
                userId
                :
                '99444331';
            const promise = customAxiosRequest().get(`${API_URL}getlikes?user_id=${id}`);
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
            }).catch(
                (error: any) => {
                    if (error.response) {
                        dispatch(Actions.errorFetchingLikedAnecdotes());
                    } else if (error.request) {
                        dispatch(Actions.errorFetchingLikedAnecdotes());
                    } else {
                        dispatch(Actions.errorFetchingLikedAnecdotes());
                    }
                }
            );
        };
    },
    toggleLike: (userId: string, anecdoteId: string, currentView: string) => {
        return (dispatch: Dispatch) => {
            const parsedUserId = userId && userId !== '' && userId !== undefined ?
                userId
                :
                '99444331';

            const promise = customAxiosRequest()
                .post(`${API_URL}likeswitch`,
                    `user_id=${parsedUserId}&anek_id=${anecdoteId}`
                );
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
            const promise = customAxiosRequest().post(
                `${API_URL}suggest`,
                `userId=${parsedUserId}&text=${anecdoteText}&isAnon=${isAnonymous}&username=${parsedUsername}`);
            promise.then(
                (response: any) => {
                    if (response.status === 200) {
                        dispatch(Actions.finishSharingAnecdote());
                    }
                }
            ).catch(
                (error: any) => {
                    dispatch(Actions.errorSharingAnecdote());
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
