import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { string, func } from 'prop-types';

import { generateDateSeed, getUrlParameter } from "../../Utils/RequestUtils";

import './leader-board.component.css';

export class LeaderBoardComponent extends Component {

  static propTypes = {
    fetchLeaderBoard: func.isRequired,
    seed: string
  };

  static defaultProps = {
    seed: null
  };

  state = { seed: '' };

  componentDidMount() {
    if (! this.props.seed) {
      let seed = getUrlParameter("seed");
      seed = ( seed || generateDateSeed());
      this.props.fetchLeaderBoard(seed);
    } else {
      this.props.fetchLeaderBoard(this.props.seed);
    }
  };

  handleChange = event => {
    this.setState({seed: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.fetchLeaderBoard(this.state.seed);
  };

  renderScores = () => {
    return this.props.scores.map( (score, index) => (
        <div className='leaderboard__score' key={index}>
          <span className='leaderboard__column'>{score.name}</span>
          <span className='leaderboard__column'>{score.score}</span>
        </div>
    ));
  };

  render(){
    if (!this.props.seed) return null;
    return (
        <div className="leaderboard">
          <h1 className="leaderboard__h1">LeaderBoard for seed "{this.props.seed}" </h1>
          <h2 className="leaderboard__h2">Top 10</h2>
          <div className="leaderboard__divider"/>
          {this.renderScores()}
          <form className="leaderboard__form" onSubmit={this.handleSubmit}>
            <input
                className="leaderboard__input"
                type="text"
                placeholder="Check other seeds"
                value={this.state.seed}
                onChange={this.handleChange}
            />
            <button className="leaderboard__btn" type="submit">Submit</button>
          </form>
          <Link className="leaderboard__btn" to='/maze'>Back to game</Link>
        </div>
    );
  }
}
