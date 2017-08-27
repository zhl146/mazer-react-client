import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import './App.css';
import {LeaderBoardComponent} from "./components/LeaderBoard.component";
import MazeContainer from "./components/Maze.container";


const App = () => (
    <Switch>
        <Redirect from="/" exact to="/maze/" />
        <Route exact path="/maze/:seed?" component={ MazeContainer } />
        <Route exact path="/leaderboard/:seed?" component={ LeaderBoardComponent } />
    </Switch>
);


export default App;
