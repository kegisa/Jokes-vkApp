import { ActionsUnion, createAction } from '@store/actions-helpers';
import { Dispatch } from 'redux';
import connect from '@vkontakte/vkui-connect';
import { FetchedUser } from '@models';
import {SIGNATURE} from '../../shared/GlobalConsts';

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
            connect.send('VKWebAppGetUserInfo', {});
        };
    },
    wallPost: (joke: string) => {
        return () => {
            const text = `${joke} \n ${SIGNATURE}`;
            connect.send('VKWebAppShowWallPostBox', {message: text, attachments: 'photo-83635163_456239105' });
        };
    },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
