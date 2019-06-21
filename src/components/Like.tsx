import React from 'react';
import {Button, Cell, Group, List, Panel, PanelHeader, ScreenSpinner} from '@vkontakte/vkui';
import Icon16Like from '@vkontakte/icons/dist/16/like';

interface LikeProps {
    id: string;
}

interface LikeState {
    jokes: any;
    isFetching: boolean;
}

class LikeComponent extends React.Component<LikeProps, LikeState> {

    state = {
        jokes: [],
        isFetching: true,
    };

    componentDidMount() {
        this.loadJokes();

    }

    /*  loadJokes(){
           //fetch('http://92.240.135.238:5000/')
           fetch('https://api.icndb.com/jokes/random/10')
           .then(response => response.json())
           .then(data => {this.setState({ jokes: data.value});
          // .then(data => {this.setState({ jokes: data.value});
           });
           console.log(this.state.jokes);
           this.state.isFetching = false;
       }*/
    loadJokes() {
        fetch('http://66160595b12e.sn.mynetname.net:5000/')
            .then(response => response.json())
            .then(data => {
                this.setState({jokes: data});
            });
        this.state.isFetching = false;
    }

    render() {

        const {jokes} = this.state;
        const {isFetching} = this.state;
        return (
            <Panel id="like">
                <PanelHeader>Любимые</PanelHeader>
                {isFetching && <ScreenSpinner className="spinner" size="large" style={{marginTop: 20}}/>}
                {jokes.map((joke: any, index: number) =>
                    <Group className="post" key={index}>
                        <List>
                            <Cell multiline={true} key={index}>
                                <text>{joke.joke}</text>
                            </Cell>
                            <Cell
                                key={index}
                                asideContent={
                                    <Button
                                        className="likes"
                                        level="tertiary"
                                        after={<Icon16Like/>}
                                        size="xl"
                                    >
                                        {joke.likes}
                                    </Button>
                                }
                            />
                        </List>
                    </Group>
                )}
            </Panel>

        );

    }
}

export const Like = (LikeComponent);
