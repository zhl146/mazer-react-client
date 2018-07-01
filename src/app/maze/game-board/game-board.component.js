import React, { Component } from 'react'
import { bool, object, number, array } from 'prop-types'

import MazePath from './path.component'
import { ConnectedMazeTile } from './maze-tile/maze-tile.container'

import './game-board.css'

export class GameBoard extends Component {
  static propTypes = {
    rotateMaze: bool.isRequired,
    maze: object.isRequired,
    path: array.isRequired,
    tileSize: number.isRequired,
    pathErrorTime: number,
  }

  render() {
    return (
      <div className="game-board">
        {makeMazeTileGrid(this.props.maze.mazeTiles, this.props.rotateMaze)}
        <MazePath
          pathErrorTime={this.props.pathErrorTime}
          maze={this.props.maze}
          path={this.props.path}
          rotateMaze={this.props.rotateMaze}
          tileSize={this.props.tileSize}
        />
      </div>
    )
  }
}

const makeMazeTileGrid = (mazeTiles, rotateMaze) => {
  let tiles
  if (rotateMaze) {
    const transpose = m => m[0].map((x, i) => m.map(x => x[i]))
    tiles = transpose(mazeTiles)
  } else {
    tiles = mazeTiles
  }
  return tiles.map((row, index) => (
    <div key={index} className="container-row">
      {makeMazeRow(row)}
    </div>
  ))
}

const makeMazeRow = row => {
  return row.map((tile, index) => <ConnectedMazeTile tile={tile} key={index} />)
}
