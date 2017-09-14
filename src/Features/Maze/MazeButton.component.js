import ButtonTemplate from '../../Utils/Components/ButtonTempate.component';
import React from 'react';
import CustomError from '../../Utils/CustomError';

function submitScore( maze, history, user, token ){
  console.log("MAZE: "+JSON.stringify(maze));
  let solution = {
    seed: maze.seed,
    mazeTiles: maze.mazeTiles,
    user: user,
    token: token,
  };

  fetch('zhenlu.info/check', {
        method: "POST",
        body: JSON.stringify(solution)
      })
      .then( (res) => {
        history.push('/leaderboard/');
        if(!res.ok){
          throw CustomError("Posting back to the server failed!");
        }
        return res;
      })
      .then( res => res.json())
      .then( data => {
          console.log(data);
      })
      .catch((ex) => {
        alert("Sending your score to the server failed, if this persists please contact the admin!");
        console.log("ERROR: "+ex);
      });
}

const SubmitScoreButton = (props) => {
  let disabled = false;
  if(!props.user || !props.token) {
    disabled = true;
  }

  let input = {
    "maze": props.maze,
    "history": props.history,
    "user": props.user,
    "token": props.token
  };

  return (
      <ButtonTemplate
          onClickInput={input}
          clickHandler={submitScore}
          cssAttributes={props.cssAttributes}
          disabled={disabled}
          text="Submit"
      />
  );
};

const ResetMazeButton = ({ seed, onResetClick, cssAttributes}) => {
  return (
      <ButtonTemplate onClickInput={seed}
                         clickHandler={onResetClick}
                         cssAttributes={cssAttributes}
                         text="Reset" />
  );
};

export {
  SubmitScoreButton,
  ResetMazeButton
};