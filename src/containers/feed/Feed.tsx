import React from 'react';
import {Avatar, Group, List, ListItem, Panel, PanelHeader, PullToRefresh} from '@vkontakte/vkui';
import {Anecdote} from '../../components/anecdote/Anecdote';
import {DispatchThunk, RootState} from '@store';
import {getFetchedUser, Thunks as appThunks} from '@store/app';
import {FetchedUser, IAnecdote} from '@models';
import {connect} from 'react-redux';
import {getFetching as getApiFetching, getJokes, Thunks as apiThunks} from '@store/api';

interface FeedProps {
    id?: string;
    user?: FetchedUser;
    onLoadJokes: any;
    toggleLike: any;
    doRepost: any;
    jokes: any[];
    isJokesFetching: boolean;
}

interface FeedState {
    jokes: any;
    isFirstFetching: boolean;
}

class FeedComponent extends React.Component<FeedProps, FeedState> {
    state = {
        jokes: [],
        isFirstFetching: true,
    };

    componentDidMount() {
        const fetchedUser = this.props.user;
        const userId = fetchedUser ? fetchedUser.id : null;
        if (this.props.jokes.length === 0) {
            this.props.onLoadJokes && this.props.onLoadJokes(userId);
        }
        this.setState({
            ...this.state,
            isFirstFetching: false,
        });
    }

    handleClick = (anekId: any) => {
        const fetchedUser = this.props.user;
        const userId = fetchedUser ? fetchedUser.id : null;
        this.props.toggleLike && this.props.toggleLike(userId, anekId);
    };

    handleRepost = (joke: string) => {
        this.props.doRepost && this.props.doRepost(joke);
    };

    renderUserInfo(): JSX.Element {
        const {user} = this.props;
        return user ?
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

    onRefresh = () => {
        const fetchedUser = this.props.user;
        const userId = fetchedUser ? fetchedUser.id : null;
        this.props.onLoadJokes && this.props.onLoadJokes(userId);
    };

    render() {
        const {isJokesFetching, jokes} = this.props;
        return (
            <Panel id="feed">
                <PanelHeader>
                    Лента
                </PanelHeader>
                {
                    isJokesFetching && this.state.isFirstFetching ?
                        <div>
                            <img className="loader" src={'./loader.gif'}/>
                        </div>
                        :
                        <PullToRefresh
                            onRefresh={this.onRefresh}
                            isFetching={isJokesFetching}
                        >
                            <Group>
                                <List>
                                    {
                                        jokes.map((joke: IAnecdote) =>
                                            <Anecdote
                                                key={joke.id}
                                                id={joke.id}
                                                joke={joke}
                                                likePressed={this.handleClick}
                                                repostPressed={this.handleRepost}
                                            />
                                        )
                                    }
                                </List>
                            </Group>
                        </PullToRefresh>
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
    onLoadJokes: (userId: string) => {
        dispatch(apiThunks.getAnecdotes(userId));
    },
    toggleLike: (userId: string, anecdoteId: string) => {
        dispatch(apiThunks.toggleLike(userId, anecdoteId));
    },
    doRepost: (joke: string) => {
        dispatch(appThunks.wallPost(joke));
    },
});

export const Feed = connect(mapStateToProps, mapDispatchToProps)(FeedComponent);
