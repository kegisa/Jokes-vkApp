import * as React from 'react';
import * as ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import './assets/styles/main.scss';


const rootElement = document.getElementById('root');

connect.subscribe((e) => {
    switch (e.detail.type) {
        case 'VKWebAppUpdateConfig':
            let schemeAttribute = document.createAttribute('scheme');
            schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_light';
            document.body.attributes.setNamedItem(schemeAttribute);
            break;

        default:
            console.log(e.detail.type);
    }
});

connect.send('VKWebAppInit', {});

let render = () => {
    const App = require('./containers/App').App;
    ReactDOM.render(
        <App/>,
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
