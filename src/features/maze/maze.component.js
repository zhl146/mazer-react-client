import React, { Component } from 'react';
import { func, object, number, bool } from 'prop-types';

import './maze.css';
import { MazeTopBar } from './maze-ui-bars/maze-top-bar.component';
import { MazeGameBoard } from "./maze-game-board/maze-game-board.component";
import { ConnectedMazeBottomBar } from "./maze-ui-bars/maze-bottom-bar.container";
import { generateDateSeed, getUrlParameter } from "../../Utils/RequestUtils";

export class MazeComponent extends Component {

  static propTypes = {
    fetchHighScore: func.isRequired,
    initializeMaze: func.isRequired,
    updateViewPort: func.isRequired,
    pathError: bool.isRequired,
    actionError: bool.isRequired,
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
      this.startFetchingHighScore(seed);
    } else {
      this.startFetchingHighScore(this.props.maze.seed);
      this.onWindowResize();
    }
    window.addEventListener("resize", this.resizeThrottler, false);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeThrottler);
    clearInterval(this.highScoreFetchInterval);
  }

  startFetchingHighScore = (seed) => {
    if (this.highScoreFetchInterval) clearInterval(this.highScoreFetchInterval);
    this.fetchHighScore(seed);
    this.highScoreFetchInterval = setInterval(() => this.fetchHighScore(seed), 30000);
  };

  fetchHighScore = (seed) => {
    this.props.fetchHighScore(seed);
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
    let {
      highScore,
      maze,
      tileSize,
      path,
      rotateMaze,
      pathError,
      actionError
    } = this.props;

    if(!maze || !maze.mazeTiles) return null;
    return (
        <div className='maze-component'>
          <MazeTopBar
              actionError={actionError}
              highScore={highScore}
              usedActions={maze.actionsUsed}
              maxActions={maze.params.maxActionPoints}
              scoreValue={maze.score}
          />
          <MazeGameBoard
              pathError={pathError}
              tileSize={tileSize}
              maze={maze}
              path={path}
              rotateMaze={rotateMaze}
          />
          <ConnectedMazeBottomBar />
        </div>
    );
  }
}
