import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Maze.css';
import Tile from './MazeTile.component';
import ScoreBoard from '../Score/Score.component';
import { SubmitScoreButton } from "./MazeButton.component"
import MazePath from "./MazePath.component";

class MazeComponent extends Component {

  render() {
    if(!this.props.maze.mazeTiles) return null;
    return (
        <div className='Maze'>
            <ScoreBoard score={this.props.score}/>
          <div>
            {
              makeMazeTileGrid(this.props.maze.mazeTiles, this.props.onMazeClick)
            }
            <div className="maze-path">
              <MazePath  maze={this.props.maze} />
            </div>
          </div>
          <SubmitScoreButton history={this.props.history} maze={this.props.maze} text={"Submit"} cssAttributes={"Button"}/>
        </div>

    )
  }
}

const makeMazeTileGrid = (mazeTiles, onMazeClick) => {
  return mazeTiles.map( (row, index) => (
          <div key={index} className='container-row'>
            { makeMazeRow(row, onMazeClick) }
          </div>
      )
  )
};

const makeMazeRow = (row, onMazeClick) => {
  return row.map(
      (tile, index) => (
          <Tile key={index} tile={tile} onClick={ onMazeClick } />
      )
  )
};

MazeComponent.PropTypes = {
  onMazeClick: PropTypes.func.isRequired,
  maze: PropTypes.object.isRequired
};

export default MazeComponent;