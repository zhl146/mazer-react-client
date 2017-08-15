import React from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/TileComponent';
import shared from 'mazer-shared';

export const MazeComponent = (seed, maze, onMazeClick, startMaze) => {
    let mazeTiles = (maze.mazeTiles? mazeTiles: []);
    return mazeTiles.map((tilesArray) => (
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