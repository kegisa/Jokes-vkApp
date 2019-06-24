import React from 'react';
import {Avatar, Group, ListItem, Panel, PanelHeader, ScreenSpinner} from '@vkontakte/vkui';
import {Anecdote} from '../../components/anecdote/Anecdote';
import {DispatchThunk, RootState} from '@store';
import {getFetchedUser, Thunks as appThunks} from '@store/app';
import {FetchedUser} from '@models';
import {connect} from 'react-redux';
import {getFetching as getApiFetching, getJokes, Thunks as apiThunks} from '@store/api';

interface FeedProps {
    id?: string;
    user?: FetchedUser;
    onLoadJokes: any;
    jokes: any[];
    isJokesFetching: boolean;
}

interface FeedState {
    jokes: any;
    isFetching: boolean;
}

class FeedComponent extends React.Component<FeedProps, FeedState> {
    state = {
        jokes: [],
        isFetching: true,
    }
    ;

    componentDidMount() {
        this.props.onLoadJokes && this.props.onLoadJokes();
    }

    handleClick = (e) => {
        // tslint:disable-next-line:no-console
        console.log('like pressed', e);
    };

    renderUserInfo(): JSX.Element {
        const {user} = this.props;
        return user && user !== undefined ?
            (
                <Group
                    title="User Data Fetched with VK Connect"
                >
                    <ListItem
                        before={
                            user.photo_200 ?
                                <Avatar src={user.photo_200}/> :
                                null
                        }
                    >
                        {
                            `${user.first_name}
                                ${user.last_name}
                                ${user.id}
                                ${user.city.title ? user.city.title : ''}`}
                    </ListItem>
                </Group>
            )
            :
            <></>;
    }

    render() {
        const {isJokesFetching, jokes} = this.props;
        return (
            <Panel id="feed">
                <PanelHeader>
                    Лента
                </PanelHeader>
                {
                    this.renderUserInfo()
                }
                {
                    isJokesFetching ?
                        <ScreenSpinner
                            className="spinner"
                            size="large"
                            style={{marginTop: 20}}
                        />
                        :
                        jokes.map((joke: any, index: number) =>
                            <Anecdote
                                key={index}
                                id={index}
                                joke={joke}
                                likePressed={this.handleClick}
                            />
                        )
                }
            </Panel>

        );

    }
}

const mapStateToProps = (state: RootState) => {
    return {
        user: getFetchedUser(state),
        isJokesFetching: getApiFetching(state),
        jokes: getJokes(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onLoadUserInfo: () => {
        dispatch(appThunks.getUserInfo());
    },
    onLoadJokes: () => {
        dispatch(apiThunks.getAnecdotes());
    },
});

export const Feed = connect(mapStateToProps, mapDispatchToProps)(FeedComponent);
