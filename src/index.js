import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";


import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';
import configureStore from './model/store-config';

ReactDOM.render(
    <Provider store={configureStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
