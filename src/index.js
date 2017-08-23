import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware"
import MazeReducer from './Maze/reducers/Maze.reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";

let store = createStore(MazeReducer, applyMiddleware(promiseMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
