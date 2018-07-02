import React, { Component } from 'react'
import { quintInOut, quadInOut } from 'eases'
import { object, bool, array, number } from 'prop-types'
import { Color, ColorToString } from 'utils/color'
import { Interpolate } from 'utils/interpolate'

const RotationSpeed = 1
const DesiredDashSize = 15

// Measured in pixels per second
const CircleDuration = 1000
const CirclePathColor = Color(20,150,150,0.5)

const PauseDuration = 300

const SpinDuration = 1000

const AwayDuration = 2000

export class ProgressIndicator extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    lineWidth: number.isRequired,
  }

  elRef

  componentDidMount() {
    const context = this.elRef.getContext('2d')
    this.configureContext(context)
    window.requestAnimationFrame(this.animatePath(context, 0, 0))
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.width != nextProps.width ||
      this.props.height != nextProps.height
    )
  }

  componentDidUpdate() {
    const context = this.elRef.getContext('2d')
    this.configureContext(context)
  }

  configureContext = context => {
    context.lineJoin = 'miter'
  }

  drawPath = (context, startAngle, radians, { strokeStyle, lineWidth }) => {
    context.strokeStyle = strokeStyle
    context.lineWidth = lineWidth
    context.clearRect(0, 0, this.props.width, this.props.height)
    context.beginPath()
    context.arc(this.props.width/2, this.props.height/2, this.getRadius(lineWidth), startAngle, startAngle + radians)
    context.stroke()
  }

  getRadius = (lineWidth) => Math.min(this.props.width, this.props.height) / 2 - lineWidth / 2

  animatePath = (context, oldStartAngle, lastTime) => timestamp => {
    const totalAnimationTime = PauseDuration + CircleDuration + PauseDuration + AwayDuration
    const timer = timestamp - Math.floor(timestamp / totalAnimationTime) * totalAnimationTime
    const startAngle = oldStartAngle + RotationSpeed * (timestamp - lastTime) / 1000

    const style = {
      strokeStyle: ColorToString(CirclePathColor),
      lineWidth: this.props.lineWidth
    }

    // A static dash size won't match the end of the circle
    const circumference = 2*Math.PI * this.getRadius(style.lineWidth)
    const segmentSize = circumference / Math.ceil(circumference / DesiredDashSize)

    if (timer < PauseDuration)
    {
      this.drawPath(context, startAngle, 0, style)
    }
    else if (timer < PauseDuration + CircleDuration)
    {
      const lerp = (timer - PauseDuration) / CircleDuration
      const easing = quadInOut(lerp)
      context.setLineDash([segmentSize * 2/3, segmentSize * 1/3])
      this.drawPath(context, startAngle, 2*Math.PI * easing, style)
    }
    else if (timer < PauseDuration + CircleDuration + SpinDuration)
    {
      this.drawPath(context, startAngle, 2*Math.PI, style)
    }
    else 
    {
      const lerp = (timer - (PauseDuration + CircleDuration + SpinDuration)) / AwayDuration
      const easing = quintInOut(lerp)
      const dashSize = Interpolate(segmentSize * 2/3, 0, easing)
      context.setLineDash([dashSize, segmentSize - dashSize])
      this.drawPath(context, startAngle, 2*Math.PI, style)
    }

    window.requestAnimationFrame(
      this.animatePath(context, startAngle, timestamp)
    )
  }

  render() {
    return (
      <canvas
        ref={elRef => (this.elRef = elRef)}
        width={this.props.width}
        height={this.props.height}
      />
    )
  }
}
