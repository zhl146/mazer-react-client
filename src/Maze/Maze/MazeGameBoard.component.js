import React, { Component } from 'react';

import MazePath from './MazePath.component';
import Tile from "./MazeTile.component";

class MazeGameBoardComponent extends Component{

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

export default MazeGameBoardComponent;