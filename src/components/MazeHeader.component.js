import React from 'react';
import PropTypes from 'prop-types';

const MazeHeaderComponent = ({maze, scoreValue}) => {

  return (
      <table style={{width:'100%'}}>
        <tbody>
        <tr>
          <th>SCORE</th>
          <th>HIGH SCORE</th>
          <th>ACTIONS</th>
        </tr>
        <tr style={{textAlign:'center'}}>
          <td>{scoreValue}</td>
          <td>9000</td>
          <td>{maze.params.maxActionPoints - maze.actionsUsed}/{maze.params.maxActionPoints}</td>
        </tr>
        </tbody>
      </table>
  )
};


MazeHeaderComponent.PropTypes = {
    maze: PropTypes.object.isRequired,
    scoreValue: PropTypes.number.isRequired
};


export default MazeHeaderComponent;