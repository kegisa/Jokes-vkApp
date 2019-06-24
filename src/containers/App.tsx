import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from '@store';
import {Main} from './Main';

interface Props {
}

export const AppComponent: React.FunctionComponent<Props> = props => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>);
};
export const App = (AppComponent);
