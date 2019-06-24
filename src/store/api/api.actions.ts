import axios from 'axios';
import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import {API_URL} from '../../shared/GlobalConsts';
import {IAnecdote} from '@models';

export const START_FETCHING_ANECDOTES = '[API] START_FETCHING_ANECDOTES';
export const FINISH_FETCHING_ANECDOTES = '[API] FINISH_FETCHING_ANECDOTES';
export const TOGGLE_LIKE = '[API] TOGGLE_LIKE';

export const Actions = {
        startFetchingAnecdotes: () => createAction(START_FETCHING_ANECDOTES),
        finishFetchingAnecdotes: (data: IAnecdote[]) => createAction(FINISH_FETCHING_ANECDOTES, data),
        toggleLike: (userId: string, anecdoteId: string) => createAction(TOGGLE_LIKE),
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
                // tslint:disable-next-line:no-console
                console.log('response', response);
                let data = response.data.map(
                    (anecdote: any) => {
                        if (anecdote.anek_id) {
                            return anecdote;
                        }
                    }
                );
                data = data.filter(anecdote => anecdote !== undefined);
                // tslint:disable-next-line:no-console
                console.log('data', data);
                dispatch(Actions.finishFetchingAnecdotes(data));
            });
        };
    },
    toggleLike: (userId: string, anecdoteId: string) => {
        return (dispatch: Dispatch) => {
            const parsedUserId = userId && userId !== '' && userId !== undefined ?
                userId
                :
                '99444331';
            const promise = axios.post(`${API_URL}/likeswitch`, {
                user_id: parsedUserId,
                anek_id: anecdoteId,
            });
            promise.then(
                (response: any) => {
                    // tslint:disable-next-line:no-console
                    console.log('response from like', response);
                }
            );
        };
    },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
