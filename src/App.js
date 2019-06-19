import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View,Epic,Tabbar,TabbarItem,Panel,PanelHeader} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
//import './style.css';
import Send from './panels/Send';
import Feed from './panels/Feed';
import Like from './panels/Like';

import Icon28Favorite from '@vkontakte/icons/dist/28/favorite'
import Icon28Send from '@vkontakte/icons/dist/28/send'
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed'

class App extends React.Component {
	constructor (props) {
		super(props);
	
		this.state = {
			activeStory: 'feed',
			fetchedUser: null,
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
					console.log(e.detail.data.id);
					break;
				default:
					console.log(e.detail.data);
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
				  <Tabbar >
					<TabbarItem className="tb"
					  onClick={this.onStoryChange}
					  selected={this.state.activeStory === 'feed'}
					  data-story="feed"
					  text="Лента"
					><Icon28Newsfeed /></TabbarItem>
					<TabbarItem className="tb"
					  onClick={this.onStoryChange}
					  selected={this.state.activeStory === 'like'}
					  data-story="like"
					  text="Любимые"
					><Icon28Favorite /></TabbarItem>
					<TabbarItem className="tb"
					  onClick={this.onStoryChange}
					  selected={this.state.activeStory === 'send'}
					  data-story="send"
					  text="Предложить"
					><Icon28Send /></TabbarItem>
				  </Tabbar>
				}>
				  <View id="feed" activePanel="feed">	
						<Feed id='feed' fetchedUser={this.state.fetchedUser}/>					
				  </View>
				  <View id="like" activePanel="like">
						<Like id='like'/>
				  </View>
				  <View id="send" activePanel="send">
						<Send id='send'/>
				  </View>
				</Epic>
		);
	}
}

export default App;
