import axios from 'axios';
import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import {Anecdote} from '../../models/anecdotes/Anecdotes';
import {API_URL} from '../../shared/GlobalConsts';

export const START_FETCHING_ANECDOTES = '[API] START_FETCHING_ANECDOTES';
export const FINISH_FETCHING_ANECDOTES = '[API] FINISH_FETCHING_ANECDOTES';

export const Actions = {
        startFetchingAnecdotes: () => createAction(START_FETCHING_ANECDOTES),
        finishFetchingAnecdotes: (data: Anecdote[]) => createAction(FINISH_FETCHING_ANECDOTES, data),
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
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
