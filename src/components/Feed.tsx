import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {Avatar, Cell, Group, List, ListItem, Panel, PanelHeader, ScreenSpinner} from '@vkontakte/vkui';
import BottomCell from './BottomCell';
import '../assets/style.css';

interface FeedProps {
    id: string;
    fetchedUser: any;
}

interface FeedState {
    jokes: any;
    isFetching: boolean;
    fetchedUser: any;
}

class FeedComponent extends React.Component<FeedProps, FeedState> {
    state = {
        jokes: [],
        isFetching: true,
        fetchedUser: {
            id: '',
            photo_200: {},
            city: {
                title: '',
            },
            first_name: '',
            last_name: '',
        },
    }
    ;

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
        this.loadJokes();

    }

    loadJokes() {
        // fetch('http://92.240.135.238:5000/')
        fetch('https://66160595b12e.sn.mynetname.net/db')
            .then(response => response.json())
            .then(data => {
                this.setState({jokes: data});
            });
        this.state.isFetching = false;
    }

    /*loadJokes(){
        fetch('http://92.240.135.238:5000/')
        .then(response => response.json())
        .then(data => {this.setState({ jokes: data});
        });
        this.state.isFetching = false;
    }*/

    render() {

        const {jokes} = this.state;
        const {isFetching} = this.state;
        const {fetchedUser} = this.state;
        return (
            <Panel id="feed">
                <PanelHeader>
                    Лента
                </PanelHeader>
                {
                    fetchedUser &&
                    <Group title="User Data Fetched with VK Connect">
                        <ListItem
                            before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                            description={
                                fetchedUser &&
                                fetchedUser.city &&
                                fetchedUser.city.title ? fetchedUser.city.title : ''
                            }
                        >
                            {
                                `${fetchedUser.first_name}
                                ${fetchedUser.last_name}
                                ${fetchedUser.id}
                                ${fetchedUser.city.title}`}
                        </ListItem>
                    </Group>}

                {
                    isFetching &&
                    <ScreenSpinner
                        className="spinner"
                        size="large"
                        style={{marginTop: 20}}
                    />
                }
                {
                    jokes.map((joke: any, index: number) =>
                        <Group className="post" key={joke.anek_id}>
                            <List>
                                <Cell multiline={true} >
                                    <div className="mlCell">{joke.joke}</div>
                                </Cell>
                                <BottomCell quantity={joke.likes}/>
                            </List>
                        </Group>
                    )}
            </Panel>

        );

    }
}

export const Feed = (FeedComponent);