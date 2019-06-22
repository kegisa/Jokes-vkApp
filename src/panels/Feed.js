import React from 'react';
import PropTypes from 'prop-types';
import connect from '@vkontakte/vkui-connect';
import {List, Panel, ScreenSpinner, Cell, Group, ListItem, Avatar, PanelHeader,Button } from '@vkontakte/vkui';
import '../style.css';
import Icon16Like from '@vkontakte/icons/dist/16/like';


class Feed extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        jokes: [],
        isFetching : true
      };
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
        this.loadJokes();
        
    }
    loadJokes(){
        //fetch('http://92.240.135.238:5000/')
        fetch('https://66160595b12e.sn.mynetname.net/db')
        .then(response => response.json())
        .then(data => {this.setState({ jokes: data});
        });
        this.state.isFetching = false;
        connect.send("VKWebAppShowWallPostBox", {"message": "я хз как передать текст отдельного анека!","attachments":"photo27826412_365688436"});
    }
/* loadJokes(){
        fetch('https://66160595b12e.sn.mynetname.net/db')
        .then(response => response.json())
        .then(data => {this.setState({ jokes: data});
        });
        this.state.isFetching = false;
    }*/
    handleClick = () => {
        console.log('this is:', this.state);
      }
    

    render() {
        
        const {jokes} = this.state;
        const {isFetching} = this.state; 
        const {fetchedUser} = this.state;
        return(
            <Panel id="feed">
                <PanelHeader >Лента</PanelHeader>
                {fetchedUser &&
                <Group title="User Data Fetched with VK Connect">
			        <ListItem
				        before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				        description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			        >
                     {`${fetchedUser.first_name} ${fetchedUser.last_name} ${fetchedUser.id}
                     ${fetchedUser.city.title}`}
			        </ListItem>
		</Group>}

                {isFetching &&  <ScreenSpinner className= "spinner" size="large" style={{ marginTop: 20 }}/>}
                {jokes.map(joke =>
                    <Group className="post">
                        <List>
                            <Cell multiline ><div className='mlCell'>{joke.joke}</div></Cell> 
                            <Cell asideContent={ <Button className="likes" level="tertiary" after={<Icon16Like/>} size="xl" onClick={(e) => this.handleClick(e)}>{ Math.floor(Math.random() * 100) + 1}</Button>}> </Cell>
                        </List>
                        
                    </Group>
                )}
          </Panel>
            
        )
           
    }
};


export default Feed;
