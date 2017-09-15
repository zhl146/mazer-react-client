import React, {Component} from 'react';
import { LeaderBoardScore } from './leader-board-score.component';

export class LeaderBoardComponent extends Component {

  state = { seed: this.props.seed };

  componentDidMount() {
    this.props.fetchLeaderBoard(this.state.seed);
  };

  handleChange = event => {
    this.setState({seed: event.target.value});
  };

  handleSubmit = event => {
    this.props.fetchLeaderBoard(this.state.seed);
    event.preventDefault();
  };

  renderScores = () => {
    return (
        this.props.scores.map( (score, index) => <LeaderBoardScore score={score} key={index} />)
    );
  };

  render(){
    return (
        <div>
          <h1>LeaderBoard: {JSON.stringify(this.props.seed)} </h1>
          <h2>Scores: </h2>
          {this.renderScores()}
          <form onSubmit={this.handleSubmit}>
            <label>
              Seed:
              <input type="text" value={this.state.seed} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
    );
  }
}
