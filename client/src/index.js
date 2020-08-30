import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import configStore from './redux/store';

const store = configStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
