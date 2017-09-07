import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";

import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Routes from './Routes.component';
import configureStore from './store-config';

ReactDOM.render(
    <Provider store={configureStore()}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
