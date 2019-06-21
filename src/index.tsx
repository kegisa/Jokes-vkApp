import * as React from 'react';
import * as ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import './assets/styles/main.scss';
import '@vkontakte/vkui/dist/vkui.css';
import {App} from './containers/App';

connect.subscribe((e) => {
    switch (e.detail.type) {
        case 'VKWebAppUpdateConfig':
            const schemeAttribute = document.createAttribute('scheme');
            schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_light';
            document.body.attributes.setNamedItem(schemeAttribute);
            break;
        default:
        // console.log(e.detail.type);
    }
});

connect.send('VKWebAppInit', {});

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);
