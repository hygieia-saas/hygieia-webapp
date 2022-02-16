import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import history from './app/history';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import ScrollToTop from './elements/ScrollToTop';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ScrollToTop/>
                <App/>
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
