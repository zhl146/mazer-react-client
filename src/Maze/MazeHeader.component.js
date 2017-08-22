import React from 'react';

const MazeHeaderComponent = ({scoreValue, actionsUsed, actionsTotal}) => {

  return (
      <div style={{display: 'flex', justifyContent:'space-between', fontSize: '2em', margin: '10px'}}>
        <span>UserName</span>
        <span>SCORE: {scoreValue}</span>
        <span>X/Y</span>
      </div>
  )
};

export default MazeHeaderComponent;