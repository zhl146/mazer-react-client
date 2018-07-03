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

  viewportRef = React.createRef()
  gameBoardRef = React.createRef()
  transform = { translatex: 0, translatey: 0, scale: 1 }
  velocity = { x: 0, y: 0 }

  componentDidMount() {
    var mc = new Hammer.Manager(this.gameBoardRef.current)

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
      const scale = this.transform.scale * ev.scale
      const translatex = this.transform.translatex + ev.deltaX
      const translatey = this.transform.translatey + ev.deltaY
      const transform = this.constrainedTransform({ translatex: translatex, translatey: translatey, scale: scale })

      this.velocity = { x: 0, y: 0 }
      this.gameBoardRef.current.style.transform = this.transformToString(transform)
    })

    mc.on('panend pinchend', ev => {
      this.transform.scale = this.transform.scale * ev.scale
      this.transform.translatex = this.transform.translatex + ev.deltaX
      this.transform.translatey = this.transform.translatey + ev.deltaY
      this.transform = this.constrainedTransform(this.transform)

      this.velocity = { x: ev.velocityX, y: ev.velocityY }
      console.log(this.velocity)
      window.requestAnimationFrame(this.applyVelocity())

      this.gameBoardRef.current.style.transform = this.transformToString(this.transform)
    })
  }

  applyVelocity = lastTime => timestamp => {
    const elapsed = lastTime ? timestamp - lastTime : 0

    this.transform.translatex += this.velocity.x * elapsed
    this.transform.translatey += this.velocity.y * elapsed
    this.transform = this.constrainedTransform(this.transform)
    this.gameBoardRef.current.style.transform = this.transformToString(this.transform)

    this.velocity.x *= 0.9
    this.velocity.y *= 0.9
    if (this.velocity.x > 0.01 || this.velocity.y > 0.01) {
      window.requestAnimationFrame(this.applyVelocity(timestamp))
    }
  }

  constrainedTransform = ({ translatex, translatey, scale }) => {
    const viewportRect = this.viewportRef.current.getBoundingClientRect()
    const { w, h } = this.mazeSize(scale)
    const minX = w / 2 - viewportRect.width / 2
    const minY = h / 2 - viewportRect.height / 2
    const maxX = w / 2 + viewportRect.width / 2
    const maxY = h / 2 + viewportRect.height / 2
    const minScale = 1
    const maxScale = 5

    if (w < maxX - minX)
    {
      translatex = 0
    }
    else
    {
      translatex = Math.min(translatex, minX)
      if (translatex + w < maxX) {
        translatex = maxX - w
      }
    }

    if (h < maxY - minY)
    {
      translatey = 0
    }
    else
    {
      translatey = Math.min(translatey, minY)
      if (translatey + h < maxY) {
        translatey = maxY - h
      }
    }

    scale = Math.min(Math.max(scale, minScale), maxScale) 

    return { translatex, translatey, scale}
  }

  transformToString = ({ translatex, translatey, scale}) => `translate(${translatex}px,${translatey}px) scale(${scale})`

  mazeSize = (scale) => {
    const w = this.props.tileSize * this.props.maze.params.numColumns * scale
    const h = this.props.tileSize * this.props.maze.params.numRows * scale
    return this.props.rotateMaze ? { w: h, h: w } : { w, h }
  }

  render() {
    return (
      <div
        className="game-viewport"
        ref={this.viewportRef}
        >
        <div
          className="game-board"
          ref={this.gameBoardRef}
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
