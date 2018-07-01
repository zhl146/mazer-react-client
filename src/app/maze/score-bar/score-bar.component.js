import React, { Component } from 'react'
import { object, number, bool, func } from 'prop-types'

import './score-bar.css'

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

  state = { fetchInterval: null }

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
          <span>{this.getActionString()}</span>
        </div>
      </div>
    )
  }
}
