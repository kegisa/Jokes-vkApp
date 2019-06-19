import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ScreenSpinner, Cell, Group, List, Button, PanelHeader } from '@vkontakte/vkui';
import '../style.css';
import Icon16Like from '@vkontakte/icons/dist/16/like';

class Like extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        jokes: [],
        isFetching : true
      };
    }
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
    loadJokes(){
        fetch('http://66160595b12e.sn.mynetname.net:5000/')
        .then(response => response.json())
        .then(data => {this.setState({ jokes: data});
        });
        this.state.isFetching = false;
    }
    handleClick = () => {
        console.log('this is:', this.state);
      }
    
  
    render() {
        
        const {jokes} = this.state;
        const {isFetching} = this.state; 
        return(
            <Panel id="like">
                <PanelHeader >Любимые</PanelHeader>
                {isFetching &&  <ScreenSpinner className= "spinner" size="large" style={{ marginTop: 20 }}/>}
                {jokes.map(joke =>
                    <Group className="post">
                    <List>
                        <Cell multiline><text>{joke.joke}</text></Cell> 
                        <Cell asideContent={ <Button className="likes" level="tertiary" after={<Icon16Like/>} size="xl" onClick={(e) => this.handleClick(e)}>{ joke.likes}</Button>}> </Cell>
                    </List>
                    
                </Group>
                )}
          </Panel>
            
        )
           
    }
};


export default Like;
