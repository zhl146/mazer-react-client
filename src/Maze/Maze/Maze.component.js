import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Maze.css';
import MazeHeader from '../MazeHeader.component';
import MazeFooter from '../MazeFooter.component';
import MazeGameBoard from "./MazeGameBoard.component";

class MazeComponent extends Component {

  resizeTimeout;

  constructor(props) {
    super(props);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onTileClick = this.onTileClick.bind(this);
    this.resizeThrottler = this.resizeThrottler.bind(this);
  }

  onTileClick(tile) {
    this.props.clickHandlers.onMazeClick(this.props.maze,
        tile);
  };

  onWindowResize() {
    this.props.updateBoardViewParams(this.props.maze,
        {width: window.innerWidth, height: window.innerHeight});
  };

  resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !this.resizeTimeout ) {
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = null;
        this.onWindowResize();
      }, 250);
    }
  }

  componentDidMount() {
    this.onWindowResize();
    window.addEventListener("resize", this.resizeThrottler, false);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeThrottler);
  }

  render() {
    if(!this.props.maze || !this.props.maze.mazeTiles) return null;
    return (
        <div className='mazeview-container'>
          <MazeHeader maze={this.props.maze}
                      scoreValue={this.props.score}/>
          <MazeGameBoard maze={this.props.maze}
                         path={this.props.path}
                         tileSize={this.props.tileSize}
                         rotateMaze={this.props.rotateMaze}
                         onMazeClick={this.onTileClick}/>
          <MazeFooter  maze={this.props.maze}
                       displayHelp={this.props.helpDisplay}
                       onResetClick={this.props.clickHandlers.onResetClick}
                       onHelpClick={this.props.clickHandlers.onHelpClick}
                       user={this.props.user}
                       history={this.props.history} />
        </div>
    )
  }


}

MazeComponent.PropTypes = {
  onResetClick: PropTypes.func.isRequired,
  onMazeClick: PropTypes.func.isRequired,
  maze: PropTypes.object.isRequired,
  score: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default MazeComponent;