import React from 'react';

export const MazeComponent = (props) => (
    <div>
        <h1>I am MazeComponent</h1>
        <h2>{props.match.params.seed}</h2>
    </div>
);
