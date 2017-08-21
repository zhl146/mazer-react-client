import Button from '../Utils/Components/Button.component';

function submitScore({ history, maze }){
    let solution = {
        seed: maze.seed,
        diffPoints: maze.getUserChanges()
    };

    fetch('zhenlu.info/check',
        {
            method: "POST",
            body: JSON.stringify(solution)
        }
    ).then( (res) => {
        if(res.ok){
            history.push('/leaderboard/');
        }else{
            throw "Posting back to the server failed!"
        }
    }).catch((ex) => {
        alert("Sending your score to the server failed, if this persists please contact the admin!");
        console.log("ERROR: "+ex);
    });
}

const submitScoreButton = ( { maze, text } ) => {
    return ButtonComponent()
}