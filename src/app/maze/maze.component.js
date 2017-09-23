import React, { Component } from 'react';
import { func, object, bool } from 'prop-types';

import './maze.css';
import { GameBoard } from "./game-board/game-board.component";
import { ConnectedMenuBar } from "./menu-bar/menu-bar.container";
import { generateDateSeed, getUrlParameter } from "../../utils/request.utils";
import { ConnectedScoreBar } from "./score-bar/score-bar.container";
import { debounce } from "../../utils/functional.utils";

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

  updateViewPort = debounce(this.props.updateViewPort, 200);

  componentDidMount() {
    if (!this.props.maze ) {
      let seed = getUrlParameter("seed");
      seed = ( seed || generateDateSeed());
      this.props.initializeMaze(seed);
    }
    this.onWindowResize();
    window.addEventListener("resize", this.onWindowResize, false);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  };

  onWindowResize = () => {
    this.updateViewPort({width: window.innerWidth, height: window.innerHeight});
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
