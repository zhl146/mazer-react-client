import React, { Component } from 'react';
import { func, object, number } from 'prop-types';

import './maze.css';
import { MazeTopBar } from './maze-ui-bars/maze-top-bar.component';
import { MazeGameBoard } from "./maze-game-board/maze-game-board.component";
import { ConnectedMazeBottomBar } from "./maze-ui-bars/maze-bottom-bar.container";
import { generateDateSeed, getUrlParameter } from "../../Utils/RequestUtils";
import { Link } from "react-router-dom";

export class MazeComponent extends Component {

  static propTypes = {
    fetchHighScore: func.isRequired,
    initializeMaze: func.isRequired,
    updateViewPort: func.isRequired,
    highScore: number,
    maze: object
  };

  static defaultProps = {
    maze: null
  };

  highScoreFetchInterval = null;
  resizeTimeout = null;

  componentDidMount() {
    if (!this.props.maze ) {
      let seed = getUrlParameter("seed");
      seed = ( seed || generateDateSeed());
      this.props.initializeMaze(seed);
    } else {
      this.startFetchingHighScore();
      this.onWindowResize();
    }
    window.addEventListener("resize", this.resizeThrottler, false);
  };

  componentDidUpdate() {
    this.startFetchingHighScore();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeThrottler);
    clearInterval(this.highScoreFetchInterval);
  }

  startFetchingHighScore = () => {
    if (this.highScoreFetchInterval) clearInterval(this.highScoreFetchInterval);
    this.fetchHighScore();
    this.highScoreFetchInterval = setInterval(this.fetchHighScore, 30000);
  };

  fetchHighScore = () => {
    this.props.fetchHighScore(this.props.maze.seed);
  };

  onWindowResize = () => {
    this.props.updateViewPort({width: window.innerWidth, height: window.innerHeight});
  };

  resizeThrottler = () => {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !this.resizeTimeout ) {
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = null;
        this.onWindowResize();
      }, 250);
    }
  };

  render() {
    if(!this.props.maze || !this.props.maze.mazeTiles) return null;
    return (
        <div className='maze-component'>
          <MazeTopBar
              highScore={this.props.highScore}
              usedActions={this.props.maze.actionsUsed}
              maxActions={this.props.maze.params.maxActionPoints}
              scoreValue={this.props.maze.score}
          />
          <MazeGameBoard
              tileSize={this.props.tileSize}
              maze={this.props.maze}
              path={this.props.path}
              rotateMaze={this.props.rotateMaze}
          />
          <ConnectedMazeBottomBar />
          <Link to='/leaderboard'>Check Leaderboard</Link>
        </div>
    );
  }
}
