import React from 'react';

import MazePath from "./MazePath.component";
import Tile from "./MazeTile.component";

const MazeGameBoardComponent = ({path, maze, onMazeClick}) =>{

    console.log(path);

    return (
        <div className="game-board">
          { makeMazeTileGrid(maze.mazeTiles, onMazeClick) }
          <MazePath maze={maze} path={path} />
        </div>
    )
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

export default MazeGameBoardComponent;