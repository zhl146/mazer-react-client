import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile/TileComponent';
import ScoreBoard from '../Score/ScoreComponent';

const MazeComponent = ({maze, score, onMazeClick}) => {
    console.log('score is: ' +JSON.stringify(score) + ' of type: '+typeof(score));
    if(!maze.mazeTiles) return null;
    return (
        <div className='Maze'>
            <ScoreBoard score={score} />
            {
                makeMazeTileGrid(maze.mazeTiles, onMazeClick)
            }
        </div>
    )
};

const makeMazeTileGrid = (mazeTiles, onMazeClick) => {
    return mazeTiles.map( (row, index) => (
        <div key={index} className='RowContainer'> 
            { makeMazeRow(row, onMazeClick) }
        </div>
        )
    )
}

const makeMazeRow = (row, onMazeClick) => {
    return row.map(
        (tile, index) => (
            <Tile key={index} tile={tile} onClick={ onMazeClick } /> 
        )
    )
}

MazeComponent.PropTypes = {
    onMazeClick: PropTypes.func.isRequired,
    maze: PropTypes.object.isRequired
};

export default MazeComponent;