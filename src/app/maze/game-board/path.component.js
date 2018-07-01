import React, { Component } from 'react'
import { isEqual } from 'lodash'
import { object, bool, array, number } from 'prop-types'
import { Color, ColorToString, InterpolateColor } from 'utils/color'
import { EasingFunctions } from 'utils/easing'

import './path.css'

// Measured in pixels per second
const PathSpeed = 10

// Measured in milliseconds
const ErrorFlashTime = 500

// Number of flashes in case of error
const ErrorBounces = 2

// Path colors
const NormalPathColor = Color(20,150,150,0.5)
const ErrorPathColor = Color(250,0,0,0.5)

// Stroke widths
const NormalLineWidth = 3
const ErrorLineWidth = 5

class Path extends Component {
  static propTypes = {
    maze: object.isRequired,
    path: array.isRequired,
    tileSize: number.isRequired,
    rotateMaze: bool.isRequired,
    pathErrorTime: number,
  }

  canvasWidth
  canvasHeight
  elRef

  componentDidMount() {
    const context = this.elRef.getContext('2d')
    this.configureContext(context)
    window.requestAnimationFrame(this.animatePath(context, 0))
  }

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.path, nextProps.path) ||
      this.props.pathErrorTime !== nextProps.pathErrorTime
    )
  }

  componentDidUpdate() {
    const context = this.elRef.getContext('2d')
    this.configureContext(context)
  }

  setDimensions = () => {
    if (this.props.rotateMaze) {
      this.canvasWidth = this.props.tileSize * this.props.maze.params.numRows
      this.canvasHeight =
        this.props.tileSize * this.props.maze.params.numColumns
    } else {
      this.canvasWidth = this.props.tileSize * this.props.maze.params.numColumns
      this.canvasHeight = this.props.tileSize * this.props.maze.params.numRows
    }
  }

  configureContext = context => {
    context.setLineDash([10, 5])
    context.lineJoin = 'miter'
  }

  drawPath = (context, offset, { strokeStyle, lineWidth }) => {
    context.strokeStyle = strokeStyle
    context.lineWidth = lineWidth
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    context.lineDashOffset = -offset
    let startingX = this.props.path[0].x
    let startingY = this.props.path[0].y
    context.beginPath()
    context.moveTo(startingX, startingY)
    this.props.path.forEach(point => {
      let xCoord = point.x
      let yCoord = point.y
      context.lineTo(xCoord, yCoord)
    })
    context.stroke()
  }

  animatePath = (context, offset, lastTime) => timestamp => {
    const elapsedTime = lastTime ? timestamp - lastTime : 0
    const nextOffset = offset + PathSpeed * elapsedTime / 1000

		const timeSinceLastFlash = Date.now() - this.props.pathErrorTime
    const style = this.getPathStyle(timeSinceLastFlash);

    this.drawPath(context, nextOffset, style)
    window.requestAnimationFrame(
      this.animatePath(context, nextOffset, timestamp)
    )
  }

	getPathStyle = (timeSinceLastFlash) => {
		if (timeSinceLastFlash >= ErrorFlashTime)
		{
			return {
				strokeStyle: ColorToString(NormalPathColor),
				lineWidth: NormalLineWidth
			}
		}

		const flashDuration = ErrorFlashTime / ErrorBounces
		const timeWithinFlash = timeSinceLastFlash - Math.floor(timeSinceLastFlash / flashDuration) * flashDuration;
		const easeIn = timeWithinFlash < flashDuration / 2

		const time = easeIn
									? EasingFunctions.easeInQuad(timeWithinFlash / (flashDuration / 2))
									: EasingFunctions.easeOutQuad((timeWithinFlash - (flashDuration / 2)) / (flashDuration / 2))
		const startColor = easeIn ? NormalPathColor : ErrorPathColor
		const endColor = easeIn ? ErrorPathColor : NormalPathColor
		const startWidth = easeIn ? NormalLineWidth : ErrorLineWidth
		const endWidth = easeIn ? ErrorLineWidth : NormalLineWidth
		return {
			strokeStyle: ColorToString(InterpolateColor(startColor, endColor, time)),
			lineWidth: startWidth * time + endWidth * (1-time)
		}
	}

  render() {
    this.setDimensions()
    return (
      <canvas
        className="maze-path"
        ref={elRef => (this.elRef = elRef)}
        width={this.canvasWidth}
        height={this.canvasHeight}
      />
    )
  }
}

export default Path
