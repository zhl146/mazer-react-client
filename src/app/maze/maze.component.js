import React, { Component } from 'react'
import { func, object, bool, number } from 'prop-types'

import './maze.css'
import GameBoard from './game-board/game-board.container'
import { ConnectedLeaderBoard } from '../leaderboard/leader-board.container'
import { ConnectedMenuBar } from './menu-bar/menu-bar.container'
import { generateDateSeed, getUrlParameter } from 'utils/request.utils'
import { ConnectedScoreBar } from './score-bar/score-bar.container'
import { debounce } from 'lodash'

export class MazeComponent extends Component {
  static propTypes = {
    initializeMaze: func.isRequired,
    updateViewPort: func.isRequired,
    maze: object,
  }

  static defaultProps = {
    maze: null,
  }

  initMazeWithSeed = () => {
    let seed = getUrlParameter('seed')
    seed = seed || generateDateSeed()
    this.props.initializeMaze({
      seed,
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  updateViewPort = debounce(this.props.updateViewPort, 100, { trailing: true })

  componentDidMount() {
    if (!this.props.maze) {
      this.initMazeWithSeed()
    }
    this.updateViewPort()
    window.addEventListener('resize', this.updateViewPort)
    window.addEventListener('orientationchange', this.props.updateViewPort)
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.maze) {
      this.initMazeWithSeed()
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.maze !== nextProps.maze ||
      this.props.displayLeaderboard !== nextProps.displayLeaderboard ||
      this.props.rotateMaze !== nextProps.rotateMaze ||
      this.props.tileSize !== nextProps.tileSize
    )
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewPort)
    window.removeEventListener('orientationchange', this.props.updateViewPort)
  }

  render() {
    let { maze, tileSize, path, rotateMaze } = this.props

    if (!maze || !maze.mazeTiles) return null
    if (!this.props.displayLeaderboard) {
      return (
        <div className="maze-component">
          <ConnectedScoreBar />
          <GameBoard
            tileSize={tileSize}
            maze={maze}
            path={path}
            rotateMaze={rotateMaze}
          />
          <ConnectedMenuBar />
        </div>
      )
    } else {
      return <ConnectedLeaderBoard />
    }
  }
}
