import React, { Component } from 'react'
import { bool, object, number, array } from 'prop-types'
import Hammer from 'hammerjs'

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

  state = {
    scale: 1,
    translatex: 0,
    translatey: 0,
    adjustScale: 1,
    adjustDeltaX: 0,
    adjustDeltaY: 0,
  }

  ref = React.createRef()

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
      const scale = this.state.adjustScale * ev.scale
      const translatex = this.state.adjustDeltaX + ev.deltaX / scale
      const translatey = this.state.adjustDeltaY + ev.deltaY / scale

      this.setState({
        scale,
        translatex,
        translatey,
      })
    })

    mc.on('panend pinchend', () => {
      this.setState({
        adjustScale: this.state.scale,
        adjustDeltaX: this.state.translatex,
        adjustDeltaY: this.state.translatey,
      })
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
          style={{
            transform: `translate(${translatex}px,${translatey}px) scale(${scale})`,
          }}
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
