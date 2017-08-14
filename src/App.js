import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {LeaderBoardComponent} from "./LeaderBoard/LeaderBoardComponent";
import {MazeComponent} from "./Maze/MazeComponent";


const App = () => (
    <Switch>
        <Redirect from="/" exact to="/maze/" />
        <Route exact path="/maze/:seed?" component={ MazeComponent } />
        <Route exact path="/leaderboard/:seed?" component={ LeaderBoardComponent } />
    </Switch>
);


export default App;
