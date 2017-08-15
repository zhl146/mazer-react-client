import React from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/TileComponent';

export const MazeComponent = (seed, maze, onMazeClick, startMaze) => {
    if(!maze.mazeTiles) return null;
    return maze.mazeTiles.map((tilesArray) => (
            tilesArray.map((tile) => (
                <div className="tile_wrapper">
                    <Tile  tile={tile} onClick={() => onMazeClick(tile)} /> 
                </div>
            ))
        ))
};


MazeComponent.PropTypes = {
    onClick: PropTypes.func.isRequired,
    mazeOfTiles: 
        PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.object
            )
        ).isRequired
};

export default MazeComponent;