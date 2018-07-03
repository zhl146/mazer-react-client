import React, { Component } from 'react'
import { bool, object, number, array } from 'prop-types'
import Hammer from 'hammerjs'

import MazePath from './path.container'
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

  state = {
    scale: 1,
    translatex: 0,
    translatey: 0,
  }

  ref = React.createRef()
  scale = 1
  translatex = 0
  translatey = 0

  componentDidMount() {
    var mc = new Hammer.Manager(this.ref.current)

    var pinch = new Hammer.Pinch()
    var pan = new Hammer.Pan()

    pinch.recognizeWith(pan)

    mc.add([pinch, pan])

    // Prevent long press saving on mobiles.
    document.addEventListener('touchstart', function(e) {
      e.preventDefault()
    })

    // Handles pinch and pan events/transforming at the same time;
    mc.on('pinch pan', ev => {
      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      const scale = this.scale * ev.scale
      const translatex = this.translatex + ev.deltaX
      const translatey = this.translatey + ev.deltaY
      this.ref.current.style.transform = `translate(${translatex}px,${translatey}px) scale(${scale})`
    })

    mc.on('panend pinchend', ev => {
      this.scale = this.scale * ev.scale
      this.translatex = this.translatex + ev.deltaX
      this.translatey = this.translatey + ev.deltaY
      this.ref.current.style.transform = `translate(${this.translatex}px,${this.translatey}px) scale(${this.scale})`
    })
  }

  panViewPort = () => {}

  zoomViewPort = () => {}

  render() {
    const { translatex, translatey, scale } = this.state
    return (
      <div className="game-viewport">
        <div
          className="game-board"
          ref={this.ref}
        >
          {makeMazeTileGrid(this.props.maze.mazeTiles, this.props.rotateMaze)}
          <MazePath
            pathErrorTime={this.props.pathErrorTime}
            maze={this.props.maze}
            path={this.props.path}
            rotateMaze={this.props.rotateMaze}
            tileSize={this.props.tileSize}
            />
        </div>
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
