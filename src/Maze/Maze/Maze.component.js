import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Maze.css';
import MazeHeader from '../MazeHeader.component';
import MazeFooter from '../MazeFooter.component';
import MazeGameBoard from "./MazeGameBoard.component";

class MazeComponent extends Component {

  mazeContainerRef = null;

  constructor(props) {
    super(props);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onTileClick = this.onTileClick.bind(this);
  }

  onTileClick(tile) {
    this.props.clickHandlers.onMazeClick(this.props.maze,
        tile);
  };

  onWindowResize() {
    this.props.updateBoardViewParams(this.props.maze,
        {width: window.innerWidth, height: window.innerHeight});
  };

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    if(!this.props.maze || !this.props.maze.mazeTiles) return null;
    return (
        <div className='mazeview-container'
             ref={ elRef => { this.mazeContainerRef = elRef }}>
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