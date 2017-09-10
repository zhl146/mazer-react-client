import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthContainer from '../Auth/Auth.container';

class MazeHeaderComponent extends Component{
  constructor(props){
    super(props);
    this.state = {highscore: '...'};
    this.BASE_URL = 'https://zhenlu.info/maze/leaderboard/';
    this.urlArgs = "?start=0&length=10";
  }

  componentDidMount(){
    fetch(this.BASE_URL+this.props.maze.seed+this.urlArgs).then(
        (res) => {
          console.log(res);
          if(!res.ok) {
            throw Error(res.statusText);
          }
          res.json().then(
              (data) => {
                if (data.scores.length === 0) {
                  this.setState({highscore: '0'})
                } else {
                  this.setState({highscore: data.scores[0].name + ":" + data.scores[0].score});
                }
              }
          ).catch( (err) => {
            console.log(err);
            this.setState({highscore:"Error Loading High Score"});
          });
        }
    ).catch(
        (ex) => {
          console.log(ex);
          this.setState({highscore:"Error Fetching High Score"});
        }
    );
  }

  getActionString(){
    return this.props.maze.params.maxActionPoints - this.props.maze.actionsUsed +
        '/' + this.props.maze.params.maxActionPoints;
  }


  render(){
    return (
        <div className="header-container">
          <div>
            <span>SCORE</span>
            <span>{this.props.maze.score}</span>
          </div>
          <div>
            <span>HIGH SCORE</span>
            <span>{this.state.highscore}</span>
          </div>
          <div>
            <span>ACTIONS</span>
            <span>{this.getActionString()}</span>
          </div>
          <AuthContainer/>
        </div>
    );
  }
}

MazeHeaderComponent.PropTypes = {
  maze: PropTypes.object.isRequired,
  scoreValue: PropTypes.number.isRequired
};


export default MazeHeaderComponent;