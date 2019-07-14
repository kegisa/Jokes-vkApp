import React from 'react';
import { Panel, PanelHeader, PullToRefresh } from '@vkontakte/vkui';
import { Anecdote } from '../../components/anecdote/Anecdote';
import { DispatchThunk, RootState } from '@store';
import { getFeedScrollPosition, getFetchedUser, Thunks as appThunks } from '@store/app';
import { FetchedUser, IAnecdote } from '@models';
import { connect } from 'react-redux';
import {
    getFetching as getApiFetching,
    getIsErrorAtFeedLoadingExisting,
    getIsFirstFetchingFeed,
    getJokes,
    Thunks as apiThunks
} from '@store/api';
import { FEED_SCROLL, FEED_VIEW } from '../../shared/GlobalConsts';

interface FeedProps {
    id?: string;
    user?: FetchedUser;
    onLoadJokes: any;
    toggleLike: any;
    doRepost: any;
    jokes: any[];
    isJokesFetching: boolean;
    isFirstFetchingFeedStarted: boolean;
    onSaveScroll: any;
    scrollPosition: number;
    isErrorAtFeedLoadingExisting: boolean;
}

interface FeedState {
    jokes: any;
}

class FeedComponent extends React.Component<FeedProps, FeedState> {
    state = {
        jokes: [],
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

    renderFeed(): JSX.Element {
        const { isJokesFetching, jokes } = this.props;

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
                            Анекдоты пока не завезли.
                        </div>
                }
            </PullToRefresh>
        );
    }

    render() {
        const { isJokesFetching, isErrorAtFeedLoadingExisting } = this.props;
        return (
            <Panel id="feed">
                <PanelHeader>
                    Лента
                </PanelHeader>
                {

                    isErrorAtFeedLoadingExisting ?
                        <div className="nointernet">
                            <img
                                className="imageInet"
                                src={'./nointernet.png'}
                            />
                            Возникли проблемы с интернет соединением, пожалуйста, повтороите попытку позже.
                        </div>
                        :
                        isJokesFetching && this.props.isFirstFetchingFeedStarted ?
                            <div>
                                <img className="loader" src={'./loader.gif'} />
                            </div>
                            :
                            this.renderFeed()
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
        isFirstFetchingFeedStarted: getIsFirstFetchingFeed(state),
        scrollPosition: getFeedScrollPosition(state),
        isErrorAtFeedLoadingExisting: getIsErrorAtFeedLoadingExisting(state),

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
        dispatch(apiThunks.toggleLike(userId, anecdoteId, FEED_VIEW));
    },
    doRepost: (joke: string) => {
        dispatch(appThunks.wallPost(joke));
    },
    onSaveScroll: (scrollPosition: number) => {
        dispatch(appThunks.saveScrollPosition(scrollPosition, FEED_SCROLL));
    },
});

export const Feed = connect(mapStateToProps, mapDispatchToProps)(FeedComponent);
