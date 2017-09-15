import React from 'react';
import { number, string, object } from 'prop-types';

import { ButtonTemplate } from '../../../Utils/Components/ButtonTempate.component';
import CustomError from '../../../Utils/CustomError';

SubmitScoreButton.propTypes = {
  maze: object.isRequired,
  history: object.isRequired,
  user: object,
  token: object,
  cssAttributes: string.isRequired
};

export function SubmitScoreButton({maze,
                                    history,
                                    user,
                                    token,
                                    cssAttributes}) {
  let disabled = false;

  if(!user || !token) {
    disabled = true;
  }

  let input = { maze, history, user, token };

  return (
      <ButtonTemplate
          onClickInput={input}
          clickHandler={submitScore}
          cssAttributes={cssAttributes}
          disabled={disabled}
          text="Submit"
      />
  );
}

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
