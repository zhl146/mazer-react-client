import React from 'react';
import { object, number, bool } from 'prop-types';

import './maze-top-bar.css';

MazeTopBar.propTypes = {
  actionError: bool.isRequired,
  usedActions: number.isRequired,
  maxActions: number.isRequired,
  scoreValue: number.isRequired,
  highScore: number
};

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
