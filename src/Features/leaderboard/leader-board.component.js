import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { string, func } from 'prop-types';

import { generateDateSeed, getUrlParameter } from "../../Utils/RequestUtils";

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
        <div className='score' key={index}>
          {score.name +" : "+ score.score}
        </div>
    ));
  };

  render(){
    if (!this.props.seed) return null;
    return (
        <div>
          <h1>LeaderBoard: {this.props.seed} </h1>
          <h2>Scores: </h2>
          {this.renderScores()}
          <form onSubmit={this.handleSubmit}>
            <label>
              Seed:
              <input type="text" value={this.state.seed} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <Link to='/maze'>Back to game</Link>
        </div>
    );
  }
}
