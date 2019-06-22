import {combineReducers, Reducer} from 'redux';
import {appReducer} from '@store/app';
import {RootState} from '@store/state.types';

export const reducer: Reducer<RootState> = combineReducers<RootState>({
    app: appReducer,
});
