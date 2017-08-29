import React from 'react';
import PropTypes from 'prop-types';
import {ResetMazeButton, SubmitScoreButton} from "./MazeButton.component";

const MazeFooterComponent = ({maze, onResetClick, history, onHelpClick, displayHelp}) => {

  let renderHelp = () => {
    if (!displayHelp) return;
    return (
        <div id="info-container" >
          <p>Make the longest maze between S and E to beat the high score!</p>
          <p>The path must always link to all way-points in numerical order.</p>
          <p>You have <span id="help-action-points">33</span> action points (AP) to spend.</p>
          <p>It costs 1 AP to place a blocker on an empty tile. You can always undo this for free.</p>
          <p>It costs <span id="help-removal-cost">3</span> AP to remove a blocker that you didn't place.</p>
          <p>Bonus scoring zones are marked with red.</p>
          <p>You receive bonus score based on the distance traveled within the bonus zone.</p>
          <p>Cost to add a blocker: 1 AP</p>
          <p id="removal-cost">Cost to remove a blocker: 2 AP</p>
        </div>
    )
  };

  return (
      <div>
        {renderHelp()}

          <div id="footer-buttons">
              <div id="footer-left">
                  <button id="help-btn" className="btn-generic" onClick={onHelpClick} >?</button>
              </div>
              <div id="footer-right">
                  <ResetMazeButton seed={maze.params.seed} onResetClick={onResetClick} cssAttributes="btn-generic"  />
                  <SubmitScoreButton history={history} maze={maze} cssAttributes="btn-generic" />
              </div>
          </div>
      </div>
  )
};

MazeFooterComponent.PropTypes = {
  onResetClick: PropTypes.func.isRequired,
  maze: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


export default MazeFooterComponent;

