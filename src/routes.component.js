import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ConnectedLeaderBoard } from './app/leaderboard/leader-board.container'
import { ConnectedMaze } from './app/maze/maze.container'

const Routes = () => (
  <Switch>
    <Redirect from="/" exact to="/maze/" />
    <Route exact path="/maze/:seed?" component={ConnectedMaze} />
    <Route exact path="/leaderboard/:seed?" component={ConnectedLeaderBoard} />
  </Switch>
)

export default Routes
