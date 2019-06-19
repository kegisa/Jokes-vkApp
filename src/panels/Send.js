import React from 'react';
import PropTypes from 'prop-types';
import { Panel, FormLayout, Textarea, Button, PanelHeader } from '@vkontakte/vkui';
import '../style.css';
import anik from '../img/9.jpg';


class Send extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
        return(
            <Panel id="send" className="header" >
		        <PanelHeader >Предложить</PanelHeader>
		        <img className="Persik" src={anik} />
		        <FormLayout>
                    <Textarea  top="Мы просим тебя, пожалуйста, проверь пунктуацию и ошибки, пусть твои анекдоты будет приятнее читать." placeholder="Нарды, армяне ....." />
    		        <Button size="xl" level="secondary">Отправить</Button>
	             </FormLayout>
	        </Panel>
            
        )
           
    }
};


export default Send;
