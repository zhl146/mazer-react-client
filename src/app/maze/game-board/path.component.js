import React, { Component } from 'react';
import { isEqual } from 'lodash';
import { object, bool, array, number } from 'prop-types';

import './path.css';

class Path extends Component {

  static propTypes = {
    maze: object.isRequired,
    path: array.isRequired,
    tileSize: number.isRequired,
    rotateMaze: bool.isRequired,
    pathErrorTime: number
  };

  canvasWidth;
  canvasHeight;
  elRef;

  componentDidMount() {
    const context = this.elRef.getContext('2d');
    this.configureContext(context);
    window.requestAnimationFrame(this.animatePath(context, 0));
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.path, nextProps.path)
        || this.props.pathErrorTime !== nextProps.pathErrorTime;
  }

  componentDidUpdate() {
    const context = this.elRef.getContext('2d');
    console.log(this.elRef);
    window.requestAnimationFrame(this.animatePath(context, 0));
  }

  setDimensions = () => {
    if (this.props.rotateMaze) {
      this.canvasWidth = this.props.tileSize * this.props.maze.params.numRows;
      this.canvasHeight = this.props.tileSize * this.props.maze.params.numColumns;
    } else {
      this.canvasWidth = this.props.tileSize * this.props.maze.params.numColumns;
      this.canvasHeight = this.props.tileSize * this.props.maze.params.numRows;
    }
  };

  configureContext = context => {
    context.setLineDash([10, 5]);
    context.lineJoin = 'miter';
  };

  drawPath = (context, offset, { strokeStyle, lineWidth }) => {
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    context.lineDashOffset = -offset;
    let startingX = this.props.path[0].x;
    let startingY = this.props.path[0].y;
    context.beginPath();
    context.moveTo(startingX, startingY);
    this.props.path.forEach( point => {
      let xCoord = point.x;
      let yCoord = point.y;
      context.lineTo(xCoord, yCoord);
    } );
    context.stroke();
  };

  animatePath = (context, offset, lastTime) => timestamp => {
    const flash = Date.now() - this.props.pathErrorTime < 500;
    const elapsedTime = lastTime ? timestamp - lastTime : 0;
    const projectedOffset = elapsedTime/55;
    const nextOffset = offset + projectedOffset > 150
        ? offset + projectedOffset - 150
        : offset + projectedOffset;
    const strokeStyle = flash
        ? 'rgba(250,0,0,0.5)'
        : 'rgba(20,150,150,0.5)';
    const lineWidth = flash ? 4 : 3;
    const style = {
      strokeStyle,
      lineWidth,
    };
    this.drawPath(context, nextOffset, style);
    window.requestAnimationFrame(this.animatePath(context, nextOffset, timestamp));
  };

  render() {
    this.setDimensions();
    return <canvas
        className='maze-path'
        ref={(elRef) => this.elRef = elRef}
        width={this.canvasWidth}
        height={this.canvasHeight}
    />;
  }

}

export default Path;