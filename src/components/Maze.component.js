import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Maze.css';
import MazeHeader from './MazeHeader.component';
import MazeFooter from './MazeFooter.component';
import MazeGameBoard from "./MazeGameBoard.component";

class MazeComponent extends Component {

  onTileClick = (tile) => {
    this.props.clickHandlers.onMazeClick(this.props.maze,
        tile);
  };

    render() {
      if(!this.props.maze || !this.props.maze.mazeTiles) return null;
      return (
          <div className='Maze'>
              <MazeHeader maze={this.props.maze}
                          scoreValue={this.props.score}/>
              <MazeGameBoard maze={this.props.maze}
                             path={this.props.path}
                             onMazeClick={this.onTileClick} />
              <MazeFooter  maze={this.props.maze}
                           displayHelp={this.props.viewState.helpDisplay}
                           onResetClick={this.props.clickHandlers.onResetClick}
                           onHelpClick={this.props.clickHandlers.onHelpClick}
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