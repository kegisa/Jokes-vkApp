import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View,Epic,Tabbar,TabbarItem,Panel,PanelHeader} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';

import Icon28Favorite from '@vkontakte/icons/dist/28/favorite'
import Icon28Send from '@vkontakte/icons/dist/28/send'
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed'

class App extends React.Component {
	constructor (props) {
		super(props);
	
		this.state = {
		  activeStory: 'more'
		};
		this.onStoryChange = this.onStoryChange.bind(this);
	  }
	
	  onStoryChange (e) {
		this.setState({ activeStory: e.currentTarget.dataset.story })
	  }

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
			return (
				<Epic activeStory={this.state.activeStory} tabbar={
				  <Tabbar>
					<TabbarItem
					  onClick={this.onStoryChange}
					  selected={this.state.activeStory === 'feed'}
					  data-story="feed"
					  text="Лента"
					><Icon28Newsfeed /></TabbarItem>
					<TabbarItem
					  onClick={this.onStoryChange}
					  selected={this.state.activeStory === 'like'}
					  data-story="like"
					  text="Любимые"
					><Icon28Favorite /></TabbarItem>
					<TabbarItem
					  onClick={this.onStoryChange}
					  selected={this.state.activeStory === 'send'}
					  data-story="send"
					  text="Предложить"
					><Icon28Send /></TabbarItem>
				  </Tabbar>
				}>
				  <View id="feed" activePanel="feed">
					<Panel id="feed">
					  <PanelHeader>Feed</PanelHeader>
					</Panel>
				  </View>
				  <View id="like" activePanel="like">
					<Panel id="like">
					  <PanelHeader>Любимые</PanelHeader>
					</Panel>
				  </View>
				  <View id="send" activePanel="send">
					<Home id='send'/>
				  </View>
				</Epic>
		);
	}
}

export default App;
