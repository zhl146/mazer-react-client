import React, {Component} from 'react';

import MazePath from "./MazePath.component";
import Tile from "./MazeTile.component";

// this component is class based because we need the reference to the dom element
// so we can pass it to mazePath and do measurement calculations
class MazeGameBoardComponent extends Component{

  render() {
    return (
        <div>
          { makeMazeTileGrid(this.props.maze.mazeTiles, this.props.onMazeClick) }
          <MazePath maze={this.props.maze}/>
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

export default MazeGameBoardComponent;