import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import './App.css';
import LeaderBoardContainer from "./components/LeaderBoard.container";
import MazeContainer from "./components/Maze.container";




const App = () => (
    <Switch>
        <Redirect from="/" exact to="/maze/" />
        <Route exact path="/maze/:seed?" component={ MazeContainer } />
        <Route exact path="/leaderboard/:seed?" component={ LeaderBoardContainer } />
    </Switch>
);


export default App;
