import {IAnecdote} from '@models';

export interface AnecdotesResponse {
    type: string;
    value: IAnecdote[];
}
