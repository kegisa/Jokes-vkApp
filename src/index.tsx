import * as React from 'react';
import * as ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
<<<<<<< HEAD
import './assets/styles/main.scss';
=======
import './assets/style.css';
>>>>>>> a5f6a551af953e8550732714c89aac2b092c51fb
import '@vkontakte/vkui/dist/vkui.css';

const rootElement = document.getElementById('root');

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

let render = () => {
    const AppContainer = require('./containers/App').App;
    ReactDOM.render(
        <AppContainer/>,
        rootElement
    );
};

render();

if (module.hot) {
    const renderApp = render;
    const renderError = (error: any) => {
        const RedBox = require('redbox-react');
        ReactDOM.unmountComponentAtNode(rootElement as Element);
        ReactDOM.render(<RedBox error={error}/>, rootElement);
    };

    render = () => {
        try {
            renderApp();
        } catch (error) {
            renderError(error);
        }
    };

    module.hot.accept('./containers/App', () => {
        setTimeout(render);
    });
}
