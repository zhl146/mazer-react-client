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

const SubmitScoreButton = (props) => {
    let input = { "maze": props.maze, "history":props.history };
    return (
        <ButtonTemplate onClickInput={input} OnClick={submitScore} cssAttributes={props.cssAttributes} text="Submit" />
    )
};

const ResetMazeButton = ({ seed, onResetClick, cssAttributes}) => {
    return <ButtonTemplate onClickInput={seed} OnClick={onResetClick} cssAttributes={cssAttributes} text="Reset" />
};

export {
    SubmitScoreButton,
    ResetMazeButton
};