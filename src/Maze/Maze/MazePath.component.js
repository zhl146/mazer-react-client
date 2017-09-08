import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MazePath extends Component {

  tileOffset = this.props.tileSize / 2;
  width = this.props.tileSize * this.props.maze.params.numColumns;
  height = this.props.tileSize * this.props.maze.params.numRows;

  translateCoord(coord) {
    return coord * this.props.tileSize + this.tileOffset;
  }

  fullPath = null;
  elRef = null;

  componentDidMount() {
    this.fullPath = this.props.maze.path.reduce( (path, segment) => path.concat(segment) );
    let context = this.elRef.getContext('2d');
    this.drawPath(context);
  }

  componentDidUpdate() {
    this.fullPath = this.props.maze.path.reduce( (path, segment) => path.concat(segment) );
    // console.log(this.props.maze.mazeTiles);
    // console.log(this.fullPath);
    let context = this.elRef.getContext('2d');
    context.clearRect(0, 0, this.width, this.height);
    this.drawPath(context);
  }

  drawPath(context) {
    context.setLineDash([5, 3]);
    context.lineJoin = 'miter';
    context.lineWidth = 3;
    context.strokeStyle = 'rgba(20,150,150,0.5)';
    let startingX = this.translateCoord(this.fullPath[0].x);
    let startingY = this.translateCoord(this.fullPath[0].y);
    context.beginPath();
    context.moveTo(startingX, startingY);
    this.fullPath.forEach( point => {
      let xCoord = this.translateCoord(point.x);
      let yCoord = this.translateCoord(point.y);
      context.lineTo(xCoord, yCoord);
    } );
    context.stroke();
  }

  render() {
    return <canvas className="maze-path" ref={(elRef) => this.elRef = elRef}
                   width={this.width} height={this.height}/>
  }

}

MazePath.PropTypes = {
  maze: PropTypes.object.isRequired
};

export default MazePath;