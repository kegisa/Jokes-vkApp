import * as React from 'react';
import * as ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import './assets/style.css';
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
