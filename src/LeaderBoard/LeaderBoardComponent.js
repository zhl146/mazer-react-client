import React from 'react';

export const LeaderBoardComponent = (props) => (
    <div>
        <h1>I am LeaderBoardComponent</h1>
        <h2>{props.match.params.seed}</h2>
    </div>
);
