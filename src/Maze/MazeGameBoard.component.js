import React, {Component} from 'react';

import MazePath from "./MazePath.component";
import Tile from "./MazeTile.component";

export default class MazeGameBoardComponent extends Component{

  render() {
    return (
        <div ref={ (ref) => this.elRef = ref}>
          { makeMazeTileGrid(this.props.maze.mazeTiles, this.props.onMazeClick) }
          <MazePath  maze={this.props.maze} mazeRef={this.elRef} />
        </div>
    )
  }
};

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