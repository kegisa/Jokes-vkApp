import * as React from 'react';
import { Epic, Tabbar, TabbarItem, View } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Users from '@vkontakte/icons/dist/28/users';
import Icon28MoneyTransfer from '@vkontakte/icons/dist/28/money_transfer';
import { DispatchThunk, RootState } from '@store';
import { getFetchedUser, getFetching, Thunks as appThunks } from '@store/app';
import { FetchedUser } from '@models';
import { Feed } from './feed/Feed';
import { Send } from './share/Send';
import { Like } from './favourite/Like';
import { Top } from './tops/Top';
import { About } from './Money/About';
import { IS_DEV_MODE } from '../shared/GlobalConsts';

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

    onStoryChange = (e: any) => {
        this.setState({ activeStory: e.currentTarget.dataset.story });
    };

    componentDidMount() {
        this.props.onLoadUserInfo && this.props.onLoadUserInfo();
        this.loadImages();
    }

    loadImages() {
        const sendPNG = new Image();
        const emptyPNG = new Image();
        const inetPNG = new Image();
        const dobatPNG = new Image();
        sendPNG.src = './send.png';
        emptyPNG.src = './empty.png';
        inetPNG.src = './nointernet.png';
        dobatPNG.src = './donat.png';
    }

    checkInternet() {
        const network = window.navigator.onLine;
        if (!network) {
            this.setState({ activeStory: 'off' });
        } else {
            if (this.state.activeStory === 'off') {
                this.setState({ activeStory: 'feed' });
            }
        }
    }

    renderTabbar(): JSX.Element {
        return (
            <Tabbar>
                <TabbarItem
                    className="tb"
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'feed'}
                    data-story="feed"
                    text="Лента"
                >
                    <Icon28Newsfeed />
                </TabbarItem>
                <TabbarItem
                    className="tb"
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'like'}
                    data-story="like"
                    text="Любимые"
                >
                    <Icon28Favorite />
                </TabbarItem>
                <TabbarItem
                    className="tb"
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'send'}
                    data-story="send"
                    text="Предложить"
                >
                    <Icon28Send />
                </TabbarItem>
                <TabbarItem
                    className="tb"
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'top'}
                    data-story="top"
                    text="Топ"
                >
                    <Icon28Users />
                </TabbarItem>
                {/*<TabbarItem
                    className="tb"
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'about'}
                    data-story="about"
                    text="Вопросы"
                >
                    <Icon28MoneyTransfer />
                </TabbarItem>*/}
            </Tabbar>
        );
    }

    render() {
        const { user } = this.props;
        let isFetching: boolean | undefined;
        if (IS_DEV_MODE) {
            isFetching = false;
        } else {
            isFetching = this.props.isFetching;
        }
        return (
            <div>
                {isFetching ?
                    <div>
                        <img className="loader" src={'./loader.gif'} />
                    </div>
                    :
                    <div>
                        <Epic
                            activeStory={this.state.activeStory}
                            tabbar={this.renderTabbar()}
                        >
                            <View id="feed" activePanel="feed">
                                <Feed
                                    id="feed"
                                />
                            </View>
                            <View id="like" activePanel="like">
                                <Like id="like" />
                            </View>
                            <View id="send" activePanel="send">
                                <Send id="send" />
                            </View>
                            <View id="top" activePanel="top">
                                <Top id="top" />
                            </View>
                            {/*<View id="about" activePanel="about">
                                <About id="about" />
                </View>*/}
                        </Epic>
                        {/* <View id="off" activePanel="off">
                            <Panel id="off">
                                <PanelHeader>Нет соединения</PanelHeader>
                                <img
                                    className="imageSend"
                                    src={'./send.png'}
                                />
                            </Panel>
                        </View> */}
                    </div>
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

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);
