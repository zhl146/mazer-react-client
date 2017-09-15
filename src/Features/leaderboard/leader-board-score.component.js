import React from 'react';

export function LeaderBoardScore({score}) {
  return (
      <div className='score'>
        {score.name +" : "+ score.score}
      </div>
  );
}
