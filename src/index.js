import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";

import registerServiceWorker from './registerServiceWorker';

import './utils/styles/generic.css';
import './utils/styles/normalize.css';
import Routes from './routes.component';
import configureStore from './store/store-config';

ReactDOM.render(
    <Provider store={configureStore()}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
