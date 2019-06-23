import * as React from 'react';
import {Epic, Tabbar, TabbarItem, View} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';
import {connect as reduxConnect} from 'react-redux';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import {Feed} from '../components/Feed';
import {Like} from '../components/Like';
import {Send} from '../components/Send';
import {DispatchThunk, RootState} from '@store';
import {getFetchedUser, getFetching, Thunks as appThunks} from '@store/app';
import {FetchedUser} from '@models';

interface MainProps {
    isFetching?: boolean;
    user?: FetchedUser;
    onLoadUserInfo?: any;
}

interface MainState {
    activeStory: string;
    fetchedUser: any;
}

class MainComponent extends React.Component<MainProps, MainState> {

    state = {
        activeStory: 'feed',
        fetchedUser: {},
    };

    constructor(props: any) {
        super(props);
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange(e: any) {
        this.setState({activeStory: e.currentTarget.dataset.story});
    }

    componentDidMount() {
        this.props.onLoadUserInfo && this.props.onLoadUserInfo();
        // connect.subscribe((e) => {
        //     switch (e.detail.type) {
        //         case 'VKWebAppGetUserInfoResult':
        //             this.setState({fetchedUser: e.detail.data});
        //             break;
        //         default:
        //     }
        // });
        connect.send('VKWebAppGetUserInfo', {});

    }

    render() {
        const {isFetching, user} = this.props;
        return (
            <div>
                {isFetching ?
                    <h1>
                        Kek
                    </h1> :
                    <Epic
                        activeStory={this.state.activeStory}
                        tabbar={
                            <Tabbar>
                                <TabbarItem
                                    className="tb"
                                    onClick={this.onStoryChange}
                                    selected={this.state.activeStory === 'feed'}
                                    data-story="feed"
                                    text="Лента"
                                >
                                    <Icon28Newsfeed/>
                                </TabbarItem>
                                <TabbarItem
                                    className="tb"
                                    onClick={this.onStoryChange}
                                    selected={this.state.activeStory === 'like'}
                                    data-story="like"
                                    text="Любимые"
                                >
                                    <Icon28Favorite/>
                                </TabbarItem>
                                <TabbarItem
                                    className="tb"
                                    onClick={this.onStoryChange}
                                    selected={this.state.activeStory === 'send'}
                                    data-story="send"
                                    text="Предложить"
                                >
                                    <Icon28Send/>
                                </TabbarItem>
                            </Tabbar>
                        }
                    >
                        <View id="feed" activePanel="feed">
                            <Feed
                                id="feed"
                                fetchedUser={user}
                            />
                        </View>
                        <View id="like" activePanel="like">
                            <Like id="like"/>
                        </View>
                        <View id="send" activePanel="send">
                            <Send id="send"/>
                        </View>
                    </Epic>
                }
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isFetching: getFetching(state),
        user: getFetchedUser(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onLoadUserInfo: () => {
        dispatch(appThunks.getUserInfo());
    },
});

export const Main = reduxConnect(mapStateToProps, mapDispatchToProps)(MainComponent);
