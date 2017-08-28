import React from 'react';
import PropTypes from 'prop-types';

let verticalDiv = {
  display: 'flex',
  flexDirection: 'column',
};

let headerStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const MazeHeaderComponent = ({maze, scoreValue}) => {

  let getActionString = () => (
      maze.params.maxActionPoints - maze.actionsUsed +
      '/' + maze.params.maxActionPoints
  );

  return (
      <div className="header-container">
        <div>
          <span>SCORE</span>
          <span>{scoreValue}</span>
        </div>
        <div>
          <span>HIGH SCORE</span>
          <span>9000</span>
        </div>
        <div>
          <span>ACTIONS</span>
          <span>{getActionString()}</span>
        </div>
      </div>
  )
};


MazeHeaderComponent.PropTypes = {
    maze: PropTypes.object.isRequired,
    scoreValue: PropTypes.number.isRequired
};


export default MazeHeaderComponent;