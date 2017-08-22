import React from 'react';
import PropTypes from 'prop-types';

const MazeHeaderComponent = ({scoreValue, actionsUsed, actionsTotal}) => {

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
          <td>99/99</td>
        </tr>
        </tbody>
      </table>
  )
};

MazeHeaderComponent.PropTypes = {

};

export default MazeHeaderComponent;