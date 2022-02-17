import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import history from './app/history';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ReduxRouter } from '@lagunovsky/redux-react-router'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReduxRouter
                history={history}
                store={store}
            >
                <App/>
            </ReduxRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
