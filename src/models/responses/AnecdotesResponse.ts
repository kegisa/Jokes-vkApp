import {Anecdote} from '@models';

export interface AnecdotesResponse {
    type: string;
    value: Anecdote[];
}
