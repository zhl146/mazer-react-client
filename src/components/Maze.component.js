import React from 'react';
import PropTypes from 'prop-types';

import './Maze.css';
import MazeHeader from './MazeHeader.component';
import MazeFooter from './MazeFooter.component';
import MazeGameBoard from "./MazeGameBoard.component";

const MazeComponent = ({maze, onMazeClick, onResetClick, history, score}) => {
    console.log(maze);
    if(!maze || !maze.mazeTiles) return null;
    return (
        <div className='Maze'>
            <MazeHeader maze={maze} scoreValue={score}/>
            <MazeGameBoard maze={maze} onMazeClick={onMazeClick} />
            <MazeFooter maze={maze} onResetClick={onResetClick} history={history} />
        </div>
    )
};

MazeComponent.PropTypes = {
    onResetClick: PropTypes.func.isRequired,
    onMazeClick: PropTypes.func.isRequired,
    maze: PropTypes.object.isRequired,
    score: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default MazeComponent;