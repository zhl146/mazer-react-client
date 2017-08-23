import React from 'react';
import PropTypes from 'prop-types';

import './Maze.css';
import MazeHeader from './MazeHeader.component';
import {ResetMazeButton, SubmitScoreButton} from "./MazeButton.component"
import MazeGameBoard from "./MazeGameBoard.component";

const MazeComponent = ({maze, onMazeClick, onResetClick, history, score}) => {
    if(!maze.mazeTiles) return null;
    return (
        <div className='Maze'>
            <MazeHeader scoreValue={score}/>
            <MazeGameBoard maze={maze} onMazeClick={onMazeClick} />
            <ResetMazeButton seed={maze.params.seed} onResetClick={onResetClick} cssAttributes="Button"  />
            <SubmitScoreButton history={history} maze={maze} cssAttributes="Button" />
        </div>
    )
};

MazeComponent.PropTypes = {
  onMazeClick: PropTypes.func.isRequired,
  maze: PropTypes.object.isRequired
};

export default MazeComponent;