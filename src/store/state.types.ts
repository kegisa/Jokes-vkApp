import {ThunkDispatch} from 'redux-thunk';

import {Action} from 'redux';
import {AppState} from '@store/app';
import {ApiState} from '@store/api';

export interface RootState {
    app: AppState;
    api: ApiState;
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
