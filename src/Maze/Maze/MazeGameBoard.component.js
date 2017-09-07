import React, { Component } from 'react';

import MazePath from './MazePath.component';
import Tile from "./MazeTile.component";

class MazeGameBoardComponent extends Component{

  mazeGameBoardRef = null;

  componentDidMount() {
    console.log(this.mazeGameBoardRef.getBoundingClientRect());
  }

  render() {
    return (
        <div className="game-board" ref={ elRef => { this.mazeGameBoardRef = elRef }}>
          { makeMazeTileGrid(this.props.maze.mazeTiles,
              this.props.onMazeClick, this.props.maze.params.mazeColors.colors) }
          <MazePath maze={this.props.maze} path={this.props.path} />
        </div>
    );
  }
}

const makeMazeTileGrid = (mazeTiles, onMazeClick, colors) => {
  return mazeTiles.map( (row, index) => (
          <div key={index} className='container-row'>
            { makeMazeRow(row, onMazeClick, colors) }
          </div>
      )
  );
};

const makeMazeRow = (row, onMazeClick, colors) => {
  return row.map(
      (tile, index) => (
          <Tile key={index} colors={colors} tile={tile} onClick={ onMazeClick } />
      )
  );
};

export default MazeGameBoardComponent;