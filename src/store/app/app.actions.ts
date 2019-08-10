import { ActionsUnion, createAction } from '@store/actions-helpers';
import { Dispatch } from 'redux';
import connect from '@vkontakte/vkui-connect';
import { FetchedUser } from '@models';
import { SIGNATURE } from '../../shared/GlobalConsts';
import { ScrollInfo } from '../../models/pageInfo/PageInfo';

export const START_FETCHING_USER_INFO = '[APP] START_FETCHING_USER_INFO';
export const FINISH_FETCHING_USER_INFO = '[APP] FINISH_FETCHING_USER_INFO';
export const SAVE_SCROLL_POSITION = '[APP] SAVE_SCROLL_POSITION';

export const Actions = {
    startFetchingUserInfo: () => createAction(START_FETCHING_USER_INFO),
    finishFetchingUserInfo: (data: FetchedUser) => createAction(FINISH_FETCHING_USER_INFO, data),
    saveScrollPosition: (scrollData: ScrollInfo) => createAction(SAVE_SCROLL_POSITION, scrollData),
};

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
            const text = `${joke}\n\n${SIGNATURE}`;
            connect.send('VKWebAppShowWallPostBox', {
                message: text,
                attachments: 'https://vk.com/app7009416',
            });
        };
    },
    saveScrollPosition: (scrollPosition: number, view: string) => {
        return (dispatch: Dispatch) => {
            const scrollData: ScrollInfo = {
                view: view,
                scrollPosition: scrollPosition,
            };
            dispatch(Actions.saveScrollPosition(scrollData));
        };
    },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
