import CountUp from 'react-countup'
import React, { Component } from 'react'
import { object, number, bool, func } from 'prop-types'

import './score-bar.css'

const renderScoreBar = (previousScoreValue, scoreValue, previousHighScore, highScore, actionsRemaining) => 
    (
      <div className="header-container">
        <div>
          <span>SCORE</span>
          <CountUp start={previousScoreValue} end={scoreValue} duration={1.0} />
        </div>
        <div>
          <span>HIGH SCORE</span>
          <CountUp start={previousHighScore} end={highScore} duration={1.0} />
        </div>
        <div>
          <span>ACTIONS</span>
          <span>{actionsRemaining}</span>
        </div>
      </div>
    )

export class ScoreBar extends Component {
  static propTypes = {
    usedActions: number.isRequired,
    maxActions: number.isRequired,
    scoreValue: number.isRequired,
    fetchHighScore: func.isRequired,
    actionErrorTime: number,
    highScore: number,
  }

  static defaultTypes = {
    highScore: 0,
  }

  state = {
    fetchInterval: null,
  }

  savedScoreValue = 0
  savedHighScore = 0

  componentDidMount() {
    this.startFetchingHighScore()
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.highScore !== nextProps.highScore ||
      this.props.usedActions !== nextProps.usedActions ||
      this.props.scoreValue !== nextProps.scoreValue
    )
  }

  componentWillUnmount() {
    clearInterval(this.state.fetchInterval)
  }

  getActionString = () => {
    return (
      this.props.maxActions -
      this.props.usedActions +
      '/' +
      this.props.maxActions
    )
  }

  startFetchingHighScore = () => {
    if (this.state.fetchInterval) clearInterval(this.state.fetchInterval)
    this.fetchHighScore()
    const fetchInterval = setInterval(this.fetchHighScore, 30000)
    this.setState({ fetchInterval })
  }

  fetchHighScore = () => {
    this.props.fetchHighScore(this.props.seed)
  }

  render() {
    const { scoreValue, highScore } = this.props

    const previousScoreValue = this.savedScoreValue
    const previousHighScore = this.savedHighScore
    this.savedScoreValue = scoreValue
    this.savedHighScore = highScore

    return renderScoreBar(previousScoreValue, scoreValue, previousHighScore, highScore, this.getActionString())
  }
}
