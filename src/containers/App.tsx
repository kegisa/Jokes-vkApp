import * as React from 'react';
import {Epic, Tabbar, TabbarItem, View} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import {Feed} from '../components/Feed';
import {Like} from '../components/Like';
import {Send} from '../components/Send';

interface AppState {
    activeStory: string;
    fetchedUser: any;
}

class AppComponent extends React.Component<{}, AppState> {

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
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
                    break;
                default:
            }
        });
        connect.send('VKWebAppGetUserInfo', {});

    }

    render() {

        return (
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
                        fetchedUser={this.state.fetchedUser}
                    />
                </View>
                <View id="like" activePanel="like">
                    <Like id="like"/>
                </View>
                <View id="send" activePanel="send">
                    <Send id="send"/>
                </View>
            </Epic>
        );
    }
}

export const App = (AppComponent);
