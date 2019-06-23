<<<<<<< HEAD
import {ActionsUnion} from '@store/actions-helpers';

export const Actions = {
};

export const Thunks = {
=======
import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from 'redux';
import connect from '@vkontakte/vkui-connect';
import {FetchedUser} from '@models';

export const START_FETCHING_USER_INFO = '[APP] START_FETCHING_USER_INFO';
export const FINISH_FETCHING_USER_INFO = '[APP] FINISH_FETCHING_USER_INFO';

export const Actions = {
        startFetchingUserInfo: () => createAction(START_FETCHING_USER_INFO),
        finishFetchingUserInfo: (data: FetchedUser) => createAction(FINISH_FETCHING_USER_INFO, data),
    }
;

export const Thunks = {
    getUserInfo: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingUserInfo());
            connect.subscribe((data) => {
                switch (data.detail.type) {
                    case 'VKWebAppGetUserInfoResult':
                        dispatch(Actions.finishFetchingUserInfo(data.detail.data));
                        break;
                    default:
                }
            });
        };
    },
>>>>>>> a5f6a551af953e8550732714c89aac2b092c51fb
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
