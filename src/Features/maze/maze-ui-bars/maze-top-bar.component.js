import React from 'react';
import { object, number } from 'prop-types';
import AuthContainer from '../../auth/auth.container';

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
        <AuthContainer/>
      </div>
  );
}

// static propTypes = {
//   maze: object.isRequired,
//   scoreValue: number.isRequired
// };
//
// state = {highScore: '...'};
// BASE_URL = 'https://zhenlu.info/maze/leaderboard/';
// urlArgs = "?start=0&length=10";
//
// componentDidMount(){
//   fetch(this.BASE_URL+this.props.maze.seed+this.urlArgs).then(
//       (res) => {
//         console.log(res);
//         if(!res.ok) {
//           throw Error(res.statusText);
//         }
//         res.json().then(
//             (data) => {
//               if (data.scores.length === 0) {
//                 this.setState({highScore: '0'});
//               } else {
//                 this.setState({highScore: data.scores[0].name + ":" + data.scores[0].score});
//               }
//             }
//         ).catch( (err) => {
//           console.log(err);
//           this.setState({highScore:"Error Loading High Score"});
//         });
//       }
//   ).catch(
//       (ex) => {
//         console.log(ex);
//         this.setState({highScore:"Error Fetching High Score"});
//       }
//   );
// }