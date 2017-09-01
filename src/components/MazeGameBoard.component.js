import React from 'react';

import MazePath from "./MazePath.component";
import Tile from "./MazeTile.component";

const MazeGameBoardComponent = ({path, maze, onMazeClick}) =>{
    return (
        <div className="game-board">
          { makeMazeTileGrid(maze.mazeTiles, onMazeClick, maze.params.mazeColors.colors) }
          <MazePath maze={maze} path={path} />
        </div>
    )
};

const makeMazeTileGrid = (mazeTiles, onMazeClick, colors) => {
  return mazeTiles.map( (row, index) => (
          <div key={index} className='container-row'>
            { makeMazeRow(row, onMazeClick, colors) }
          </div>
      )
  )
};

const makeMazeRow = (row, onMazeClick, colors) => {
  return row.map(
      (tile, index) => (
          <Tile key={index} colors={colors} tile={tile} onClick={ onMazeClick } />
      )
  )
};

export default MazeGameBoardComponent;