import React, { Component } from 'react';
import { object, bool, array, number } from 'prop-types';

import './maze-path.css';

class MazePath extends Component {

  static propTypes = {
    maze: object.isRequired,
    path: array.isRequired,
    tileSize: number.isRequired,
    rotateMaze: bool.isRequired,
    pathError: bool.isRequired
  };

  canvasWidth;
  canvasHeight;
  elRef;

  componentDidMount() {
    let context = this.elRef.getContext('2d');
    this.drawPath(context);
  }

  componentDidUpdate() {
    let context = this.elRef.getContext('2d');
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawPath(context);
  }

  setDimensions() {
    if (this.props.rotateMaze) {
      this.canvasWidth = this.props.tileSize * this.props.maze.params.numRows;
      this.canvasHeight = this.props.tileSize * this.props.maze.params.numColumns;
    } else {
      this.canvasWidth = this.props.tileSize * this.props.maze.params.numColumns;
      this.canvasHeight = this.props.tileSize * this.props.maze.params.numRows;
    }
  }

  drawPath(context) {
    context.setLineDash([5, 3]);
    context.lineJoin = 'miter';
    context.lineWidth = 3;
    context.strokeStyle = 'rgba(20,150,150,0.5)';
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
  }

  render() {
    this.setDimensions();
    return <canvas
        className={this.props.pathError ? "maze-path maze-path--pulse" : "maze-path"}
        ref={(elRef) => this.elRef = elRef}
        width={this.canvasWidth}
        height={this.canvasHeight}
    />;
  }

}

export default MazePath;