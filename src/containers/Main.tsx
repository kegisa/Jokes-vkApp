import * as React from 'react';
import {Epic, Tabbar, TabbarItem, View} from '@vkontakte/vkui';
import {connect} from 'react-redux';
import PanelSpinner from '@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon28Send from '@vkontakte/icons/dist/28/send';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import {Feed} from './feed/Feed';
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

    onStoryChange = (e: any) => {
        this.setState({activeStory: e.currentTarget.dataset.story});
    };

    componentDidMount() {
        this.props.onLoadUserInfo && this.props.onLoadUserInfo();
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
        );
    }

    render() {
        const {user} = this.props;
        const {isFetching} = this.props;
        // let {isFetching} = this.props;
        // isFetching = false;
        return (
            <div>
                {isFetching ?
                    <PanelSpinner/> :
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

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);
