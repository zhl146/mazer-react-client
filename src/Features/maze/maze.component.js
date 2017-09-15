import React, { Component } from 'react';
import { func, object, number } from 'prop-types';

import './maze.css';
import { MazeTopBar } from './maze-ui-bars/maze-top-bar.component';
import { MazeGameBoard } from "./maze-game-board/maze-game-board.component";
import { ConnectedMazeBottomBar } from "./maze-ui-bars/maze-bottom-bar.container";
import { generateDateSeed, getUrlParameter } from "../../Utils/RequestUtils";

export class MazeComponent extends Component {

  static propTypes = {
    initializeMaze: func.isRequired,
    updateBoardViewParams: func.isRequired,
    maze: object
  };

  static defaultProps = {
    maze: null
  };

  resizeTimeout = null;

  componentDidMount() {
    if (!this.props.maze ) {
      let seed = getUrlParameter("seed");
      seed = ( seed || generateDateSeed());
      this.props.initializeMaze(seed);
    }

    if (this.props.maze) this.onWindowResize();
    window.addEventListener("resize", this.resizeThrottler, false);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeThrottler);
  }

  onWindowResize = () => {
    this.props.updateBoardViewParams(this.props.maze,
        {width: window.innerWidth, height: window.innerHeight});
  };

  resizeThrottler = () => {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !this.resizeTimeout ) {
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = null;
        this.onWindowResize();
      }, 250);
    }
  };

  render() {
    if(!this.props.maze || !this.props.maze.mazeTiles) return null;
    return (
        <div className='maze-component'>
          <MazeTopBar
              highScore={9000}
              usedActions={this.props.maze.actionsUsed}
              maxActions={this.props.maze.params.maxActionPoints}
              scoreValue={this.props.maze.score}
          />
          <MazeGameBoard
              tileSize={this.props.tileSize}
              maze={this.props.maze}
              path={this.props.path}
              rotateMaze={this.props.rotateMaze}
          />
          <ConnectedMazeBottomBar />
        </div>
    );
  }
}

// this used to be in the maze-top-bar component, but it should go here and not use local state
// TODO: make an action to do this and call it every minute or so from this component
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
