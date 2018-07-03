import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { string, func, array, number } from 'prop-types'

import { generateDateSeed, getUrlParameter } from '../../utils/request.utils'

import './leader-board.component.css'

export class LeaderBoardComponent extends Component {
  static propTypes = {
    fetchLeaderBoard: func.isRequired,
    topScores: array,
    closestScores: array,
    seed: string,
    token: string,
  }

  static defaultProps = {
    seed: null,
    scores: [],
  }

  state = { seed: '' }

  componentDidMount() {
    if (!this.props.seed) {
      let seed = getUrlParameter('seed')
      seed = seed || generateDateSeed()
      this.props.fetchLeaderBoard(seed)
      this.props.initializeMaze(seed)
    } else {
      this.props.fetchLeaderBoard(this.props.seed, this.props.token)
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.seed) {
  //     let seed = getUrlParameter('seed')
  //     seed = seed || generateDateSeed()
  //     this.props.fetchLeaderBoard(seed)
  //     this.props.initializeMaze(seed)
  //   } else {
  //     this.props.fetchLeaderBoard(nextProps.seed)
  //   }
  // }

  handleChange = event => {
    this.setState({ seed: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.fetchLeaderBoard(this.state.seed)
  }

  handleSolutionClick = () => {}

  renderTopScores = () => {
    return this.props.topScores.map((score, index) => (
      <div className="leaderboard__score" key={index}>
        <span className="leaderboard__column">{index + 1}</span>
        <span className="leaderboard__column">{score.name}</span>
        <span className="leaderboard__column">{score.score}</span>
        <i onClick={this.handleSolutionClick} className="fas fa-puzzle-piece" />
      </div>
    ))
  }

  render() {
    if (!this.props.topScores) return null
    return (
      <div className="leaderboard">
        <h1 className="leaderboard__h1">
          LeaderBoard for seed "{this.props.seed}"{' '}
        </h1>
        <h2 className="leaderboard__h2">Top 10</h2>
        <div className="leaderboard__score-container">
          {this.renderTopScores()}
        </div>
        <form className="leaderboard__form" onSubmit={this.handleSubmit}>
          <input
            className="leaderboard__input"
            type="text"
            placeholder="Check other seeds"
            value={this.state.seed}
            onChange={this.handleChange}
          />
          <button className="leaderboard__btn generic__btn" type="submit">
            Search
          </button>
        </form>
        <Link className="leaderboard__link generic__btn" to="/maze">
          OK
        </Link>
      </div>
    )
  }
}
