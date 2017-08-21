import ButtonTemplate from '../Utils/Components/ButtonTempate.component';
import React from 'react';
import CustomError from '../Utils/CustomError';

function submitScore( maze, history ){
    console.log("MAZE: "+JSON.stringify(maze));
    let solution = {
        seed: maze.seed,
        mazeTiles: maze.mazeTiles
    };

    fetch('zhenlu.info/check',
        {
            method: "POST",
            body: JSON.stringify(solution)
        }
    ).then( (res) => {
      history.push('/leaderboard/');
        if(res.ok){

        }else{
            throw CustomError("Posting back to the server failed!");
        }
    }).catch((ex) => {
        alert("Sending your score to the server failed, if this persists please contact the admin!");
        console.log("ERROR: "+ex);
    });
}

const SubmitScoreButton = ({ maze, text, cssAttributes, history} ) => {
    return (
        <ButtonTemplate onClickInput={maze} OnClick={submitScore} text={text} cssAttributes={cssAttributes} history={history} />
    )
};

export {
    SubmitScoreButton
};