import React, { Component } from 'react';
import { func, object, number, bool } from 'prop-types';

import './maze.css';
import { GameBoard } from "./game-board/game-board.component";
import { ConnectedMenuBar } from "./menu-bar/menu-bar.container";
import { generateDateSeed, getUrlParameter } from "../../utils/request.utils";
import { ConnectedScoreBar } from "./score-bar/score-bar.container";

export class MazeComponent extends Component {

  static propTypes = {
    initializeMaze: func.isRequired,
    updateViewPort: func.isRequired,
    pathError: bool.isRequired,
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
    }
    this.onWindowResize();
    window.addEventListener("resize", this.resizeThrottler, false);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeThrottler);
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
      maze,
      tileSize,
      path,
      rotateMaze,
      pathError,
    } = this.props;

    if(!maze || !maze.mazeTiles) return null;
    return (
        <div className='maze-component'>
          <ConnectedScoreBar />
          <GameBoard
              pathError={pathError}
              tileSize={tileSize}
              maze={maze}
              path={path}
              rotateMaze={rotateMaze}
          />
          <ConnectedMenuBar />
        </div>
    );
  }
}
