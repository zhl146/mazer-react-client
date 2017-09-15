import React, { Component } from 'react';
import { bool, func, object, number, array } from 'prop-types';

import MazePath from './maze-path.component';
import Tile from "./maze-tile.component";

export class MazeGameBoard extends Component{

  static propTypes = {
    rotateMaze: bool.isRequired,
    onMazeClick: func.isRequired,
    maze: object.isRequired,
    tileSize: number.isRequired,
    path: array.isRequired
  };

  render() {
    return (
        <div className="game-board">
          { makeMazeTileGrid(this.props.maze.mazeTiles,
              this.props.rotateMaze,
              this.props.onMazeClick,
              this.props.maze.params.mazeColors.colors,
              this.props.tileSize) }
          <MazePath maze={this.props.maze}
                    path={this.props.path}
                    rotateMaze={this.props.rotateMaze}
                    tileSize={this.props.tileSize}/>
        </div>
    );
  }
}

const makeMazeTileGrid = (mazeTiles, rotateMaze, onMazeClick, colors, tileSize) => {
  let tiles;
  if (rotateMaze) {
    const transpose = m => m[0].map((x,i) => m.map(x => x[i]));
    tiles = transpose(mazeTiles);
  } else {
    tiles = mazeTiles;
  }
  return tiles.map( (row, index) => (
          <div key={index} className='container-row'>
            { makeMazeRow(row, onMazeClick, colors, tileSize) }
          </div>
      )
  );
};

const makeMazeRow = (row, onMazeClick, colors, tileSize) => {
  return row.map(
      (tile, index) => (
          <Tile size={tileSize}
                key={index}
                colors={colors}
                tile={tile}
                onClick={ onMazeClick } />
      )
  );
};
