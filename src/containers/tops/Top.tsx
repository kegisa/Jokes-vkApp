import React from 'react';
import { connect } from 'react-redux';
import { DispatchThunk } from '@store';
import { Panel, PanelHeader, Group, List, Cell, Avatar } from '@vkontakte/vkui';
import { UserTop } from '@models';
import Icon16Like from '@vkontakte/icons/dist/16/like';

import {
    getTopUsers,
    getFetching,
    Thunks as apiThunks
} from '@store/api';

interface TopProps {
    id: any;
    isFetching: boolean;
    isErrorFetchingTopUsers: boolean;
    topUsers: any[];
    onLoadUserInfo: any;
}

interface TopState {
    topUsers: any;
    isFetching: boolean;
}

class TopComponent extends React.Component<any, TopState> {
    state = {
        topUsers: [],
        isErrorFetchingTopUsers: false,
        isFetching: true,
    };

    componentDidMount() {
        this.props.onLoadUserInfo && this.props.onLoadUserInfo();
    }

    render() {
        const { topUsers, isFetching } = this.props;
        return (
            <Panel id="top">
                <PanelHeader>
                    Топ
                </PanelHeader>

                {isFetching ?
                    <div>
                        <img className="loader" src={'./loader.gif'} />
                    </div>
                    :
                    <Group title="Лучшие юмористы">
                        <List>
                            {
                                topUsers.map((topUser) => (
                                    <Cell
                                        href={`https://vk.com/id${topUser.authorId}`}
                                        target="_blank"
                                        key={topUser.authorId}
                                        before={<Avatar
                                            size={40}
                                            src={topUser.ava}

                                        />}
                                        indicator={topUser.avgLikes}
                                        asideContent={<Icon16Like className="topLike" />}
                                    >
                                        {topUser.username}
                                    </Cell>
                                ))
                            }
                        </List>
                    </Group>
                }
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        topUsers: getTopUsers(state),
        isFetching: getFetching(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onLoadUserInfo: () => {
        dispatch(apiThunks.getTopUsers());
    },
});

export const Top = connect(mapStateToProps, mapDispatchToProps)(TopComponent);
