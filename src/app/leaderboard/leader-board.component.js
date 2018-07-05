import React, { Component } from 'react'
import { string, func, array, number } from 'prop-types'

import { generateDateSeed, getUrlParameter } from '../../utils/request.utils'

import './leader-board.component.css'

const userIdFromIdToken = (idToken) => {
  const base64Url = idToken.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64)).sub
}

export class LeaderBoardComponent extends Component {
  static propTypes = {
    fetchLeaderBoard: func.isRequired,
    toggleLeaderboard: func.isRequired,
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
      this.props.fetchClosestScores(this.props.seed, `${userIdFromIdToken(this.props.token)}`)
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
    this.props.fetchClosestScores(this.props.seed, `${userIdFromIdToken(this.props.token)}`)
  }

  handleSolutionClick = solution => () => {
    this.props.showSolution(this.props.seed, solution)
    this.props.toggleLeaderboard()
  }

  renderScores = scores =>
    scores.map((score, index) => (
      <div className="leaderboard__score" key={index}>
        <span className="leaderboard__column">{score.rank}</span>
        <span className="leaderboard__column">{score.name}</span>
        <span className="leaderboard__column">{score.score}</span>
        {score.solution && (
          <i
            onClick={this.handleSolutionClick(score.solution)}
            className="fas fa-puzzle-piece"
          />
        )}
      </div>
    ))

  render() {
    if (!this.props.topScores) return null
    return (
      <div className="leaderboard">
        <h1 className="leaderboard__h1">
          LeaderBoard for seed "{this.props.seed}"
        </h1>
        <h2 className="leaderboard__h2">Top 10</h2>
        <div className="leaderboard__score-container">
          {this.renderScores(this.props.topScores)}
          ......
          {this.renderScores(this.props.closestScores)}
        </div>
        <button
          className="leaderboard__btn generic__btn"
          onClick={this.props.toggleLeaderboard}
        >
          OK
        </button>
      </div>
    )
  }
}
