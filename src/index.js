import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import LeaderBoardReducer from './LeaderBoard/reducers/LeaderBoard.reducer';
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware"
import MazeReducer from './Maze/reducers/Maze.reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";


const reducers = combineReducers(
    MazeReducer,
    promiseMiddleware(LeaderBoardReducer)
)
//, applyMiddleware(promiseMiddleware)
let store = createStore(MazeReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
