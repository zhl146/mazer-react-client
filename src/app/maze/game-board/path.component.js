import React, { Component } from 'react'
import { isEqual } from 'lodash'
import { quadIn, quadOut } from 'eases'
import { object, bool, array, number, func } from 'prop-types'
import { Color, ColorToString, InterpolateColor } from 'utils/color'
import anime from 'animejs'

import './path.css'

// Measured in milliseconds
const ErrorFlashTime = 500

// Number of flashes in case of error
const ErrorBounces = 2

// Path colors
const NormalPathColor = Color(20, 150, 150, 0.5)
const ErrorPathColor = Color(250, 0, 0, 0.5)

// Stroke widths
const NormalLineWidth = 3
const ErrorLineWidth = 5

class Path extends Component {
  static propTypes = {
    maze: object.isRequired,
    path: array.isRequired,
    tileSize: number.isRequired,
    rotateMaze: bool.isRequired,
    resetPathError: func.isRequired,
    pathError: bool,
  }

  canvasWidth
  canvasHeight
  polylineRef = React.createRef()

  componentDidMount() {
    this.initializePathAnimation()
  }

  componentDidUpdate() {
    if (this.props.pathError) {
      this.doErrorFlash()
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.path, nextProps.path) ||
      this.props.pathError !== nextProps.pathError
    )
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

  initializePathAnimation = () => {
    anime({
      targets: this.polylineRef.current,
      easing: 'linear',
      strokeDashoffset: [0, -15],
      duration: 1500,
      loop: true,
    })
  }

  doErrorFlash = () => {
    anime({
      targets: this.polylineRef.current,
      easing: 'linear',
      stroke: ColorToString(ErrorPathColor),
      strokeWidth: ErrorLineWidth,
      duration: 100,
      direction: 'alternate',
      loop: 4,
      complete: this.props.resetPathError,
    })
  }

  render() {
    this.setDimensions()
    const reducer = (pathString, segment) =>
         pathString + ' ' + segment.map(point => `${point.x},${point.y}`).join(' ')
    const polylinePoints = this.props.path
         .reduce(reducer, '')

    return (
        <polyline
          ref={this.polylineRef}
          points={polylinePoints}
          className="maze-path"
          fill="none"
          stroke={ColorToString(NormalPathColor)}
          strokeWidth={NormalLineWidth}
          strokeDasharray='10 5'
          />
        )
  }
}

export default Path
