import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import {Anecdote} from '../../models/anecdotes/Anecdotes';
import {AnecdotesResponse} from '@models';

export const START_FETCHING_ANECDOTES = '[API] START_FETCHING_ANECDOTES';
export const FINISH_FETCHING_ANECDOTES = '[API] FINISH_FETCHING_ANECDOTES';

export const Actions = {
        startFetchingAnecdotes: () => createAction(START_FETCHING_ANECDOTES),
        finishFetchingAnecdotes: (data: Anecdote[]) => createAction(FINISH_FETCHING_ANECDOTES, data),
    }
;

export const Thunks = {
    getAnecdotes: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingAnecdotes());
            fetch('https://api.icndb.com/jokes/random/10')
                .then(response => response.json())
                .then((data: AnecdotesResponse) => {
                    // tslint:disable-next-line:no-console
                    console.log('aneks are', data);
                    dispatch(Actions.finishFetchingAnecdotes(data.value));
                });
        };
    },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
