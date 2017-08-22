import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Maze.css';
import MazeHeader from './MazeHeader.component';
import { SubmitScoreButton } from "./MazeButton.component"
import MazeGameBoard from "./MazeGameBoard.component";

const MazeComponent = ({maze, onMazeClick, history, score}) => {

    if(!maze.mazeTiles) return null;
    return (
        <div className='Maze'>
          <MazeHeader scoreValue={score}/>
          <MazeGameBoard maze={maze} onMazeClick={onMazeClick} />
          <SubmitScoreButton history={history} maze={maze} text={"Submit"} cssAttributes={"Button"}/>
        </div>

    )
};

MazeComponent.PropTypes = {
  onMazeClick: PropTypes.func.isRequired,
  maze: PropTypes.object.isRequired
};

export default MazeComponent;