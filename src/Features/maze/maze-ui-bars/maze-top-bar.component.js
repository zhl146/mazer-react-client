import React from 'react';
import { object, number } from 'prop-types';

export function MazeTopBar({ usedActions, maxActions, scoreValue, highScore}) {

  const getActionString = () => {
    return maxActions - usedActions + '/' + maxActions;
  };

  return (
      <div className="header-container">
        <div>
          <span>SCORE</span>
          <span>{scoreValue}</span>
        </div>
        <div>
          <span>HIGH SCORE</span>
          <span>{highScore}</span>
        </div>
        <div>
          <span>ACTIONS</span>
          <span>{getActionString()}</span>
        </div>
      </div>
  );
}
