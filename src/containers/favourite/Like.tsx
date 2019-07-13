import React from 'react';

import {Panel, PanelHeader, PullToRefresh} from '@vkontakte/vkui';
import {Anecdote} from '../../components/anecdote/Anecdote';
import {DispatchThunk, RootState} from '@store';
import {getFetchedUser, getLikeScrollPosition, Thunks as appThunks} from '@store/app';
import {FetchedUser, IAnecdote} from '@models';
import {connect} from 'react-redux';
import {
    getFetching as getApiFetching,
    getIsErrorAtLikedLoadingExisting,
    getIsFirstFetchingLiked,
    getLikedAnecdotes,
    Thunks as apiThunks
} from '@store/api';
import {LIKE_SCROLL, LIKE_VIEW} from '../../shared/GlobalConsts';

interface LikeProps {
    id?: string;
    user?: FetchedUser;
    onLoadJokes: any;
    toggleLike: any;
    doRepost: any;
    jokes: any[];
    isJokesFetching: boolean;
    isFirstFetchingLikedStarted: boolean;
    onSaveScroll: any;
    scrollPosition: number;
    isErrorAtLikedLoadingExisting: boolean;
}

interface LikeState {
    jokes: any;
}

class LikeComponent extends React.Component<LikeProps, LikeState> {
    state = {
        jokes: [],
        isFirstFetching: true,
    };

    componentDidMount() {
        const fetchedUser = this.props.user;
        const userId = fetchedUser ? fetchedUser.id : null;
        this.props.onLoadJokes && this.props.onLoadJokes(userId);
        window.scrollTo(0, this.props.scrollPosition);
    }

    componentWillUnmount(): void {
        this.props.onSaveScroll && this.props.onSaveScroll(window.scrollY);
    }

    handleClick = (anekId: any) => {
        const fetchedUser = this.props.user;
        const userId = fetchedUser ? fetchedUser.id : null;
        this.props.toggleLike && this.props.toggleLike(userId, anekId);
    };

    handleRepost = (joke: string) => {
        this.props.doRepost && this.props.doRepost(joke);
    };

    onRefresh = () => {
        const fetchedUser = this.props.user;
        const userId = fetchedUser ? fetchedUser.id : null;
        this.props.onLoadJokes && this.props.onLoadJokes(userId);
    };

    renderLiked(): JSX.Element {
        const {isJokesFetching, jokes} = this.props;

        return (
            <PullToRefresh
                onRefresh={this.onRefresh}
                isFetching={isJokesFetching}
            >
                {
                    jokes.length > 0 ?
                        jokes.map((joke: IAnecdote) =>
                            <Anecdote
                                key={joke.id}
                                id={joke.id}
                                joke={joke}
                                likePressed={this.handleClick}
                                repostPressed={this.handleRepost}
                            />
                        )
                        :
                        <div className="haveNotLiked">
                            <img
                                className="imageSend"
                                src={'./empty.png'}
                            />
                            У Вас пока нет любимых анекдотов, обязательно исправьте это, посетив ленту.
                        </div>
                }
            </PullToRefresh>
        );
    }

    render() {
        const {isJokesFetching, isFirstFetchingLikedStarted, isErrorAtLikedLoadingExisting} = this.props;
        return (
            <Panel id="like">
                <PanelHeader>
                    Любимые
                </PanelHeader>
                {
                    isErrorAtLikedLoadingExisting ?
                        <h4>
                            Отсутствует интернет - соединение.
                        </h4>
                        :
                        isJokesFetching && isFirstFetchingLikedStarted ?
                            <div>
                                <img className="loader" src={'./loader.gif'}/>
                            </div>
                            :
                            this.renderLiked()
                }
            </Panel>

        );

    }
}

const mapStateToProps = (state: RootState) => {
    return {
        user: getFetchedUser(state),
        isJokesFetching: getApiFetching(state),
        jokes: getLikedAnecdotes(state),
        isFirstFetchingLikedStarted: getIsFirstFetchingLiked(state),
        scrollPosition: getLikeScrollPosition(state),
        isErrorAtLikedLoadingExisting: getIsErrorAtLikedLoadingExisting(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onLoadUserInfo: () => {
        dispatch(appThunks.getUserInfo());
    },
    onLoadJokes: (userId: string) => {
        dispatch(apiThunks.getLikedAnecdotes(userId));
    },
    toggleLike: (userId: string, anecdoteId: string) => {
        dispatch(apiThunks.toggleLike(userId, anecdoteId, LIKE_VIEW));
    },
    doRepost: (joke: string) => {
        dispatch(appThunks.wallPost(joke));
    },
    onSaveScroll: (scrollPosition: number) => {
        dispatch(appThunks.saveScrollPosition(scrollPosition, LIKE_SCROLL));
    },
});

export const Like = connect(mapStateToProps, mapDispatchToProps)(LikeComponent);
