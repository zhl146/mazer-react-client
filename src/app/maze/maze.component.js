import React, { Component } from 'react'
import { func, object, bool, number } from 'prop-types'

import './maze.css'
import GameBoard from './game-board/game-board.container'
import { ConnectedMenuBar } from './menu-bar/menu-bar.container'
import { generateDateSeed, getUrlParameter } from '../../utils/request.utils'
import { ConnectedScoreBar } from './score-bar/score-bar.container'
import { debounce } from 'lodash'

export class MazeComponent extends Component {
  static propTypes = {
    initializeMaze: func.isRequired,
    updateViewPort: func.isRequired,
    pathErrorTime: number,
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
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.maze) {
      this.initMazeWithSeed()
    }
    this.updateViewPort()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewPort)
  }

  render() {
    let { maze, tileSize, path, rotateMaze, pathErrorTime } = this.props

    if (!maze || !maze.mazeTiles) return null
    return (
      <div className="maze-component">
        <ConnectedScoreBar />
        <GameBoard
          pathErrorTime={pathErrorTime}
          tileSize={tileSize}
          maze={maze}
          path={path}
          rotateMaze={rotateMaze}
        />
        <ConnectedMenuBar />
      </div>
    )
  }
}
