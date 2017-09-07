import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import LeaderBoardContainer from "./Maze/Leaderboard/LeaderBoard.container";
import MazeContainer from "./Maze/Maze/Maze.container";

const Routes = () => (
    <Switch>
        <Redirect from="/" exact to="/maze/" />
        <Route exact path="/maze/:seed?" component={ MazeContainer } />
        <Route exact path="/leaderboard/:seed?" component={ LeaderBoardContainer } />
    </Switch>
);

export default Routes;
