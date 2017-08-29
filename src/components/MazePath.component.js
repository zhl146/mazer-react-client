import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MazePath extends Component {

  //const tileSize = parentWidth / maze.params.numColumns;
  tileSize = 30; // this is here just so we can test pathfinding we will move to automatically calculating later
  tileOffset = this.tileSize / 2;
  width = this.tileSize * this.props.maze.params.numColumns;
  height = this.tileSize * this.props.maze.params.numRows;

  translateCoord(coord) {
    return coord * this.tileSize + this.tileOffset;
  }

  fullPath = this.props.maze.findPath().reduce( (path, segment) => path.concat(segment) );
  elRef = null;

  componentDidMount() {
    let context = this.elRef.getContext('2d');
    this.drawPath(context);
  }

  componentDidUpdate() {
    let context = this.elRef.getContext('2d');
    this.drawPath(context);
  }

  animatePath(context, offset = 0) {
    let newOffset = offset + 1;
    if (newOffset > 16) {
      let newOffset = 0;
    }
    this.drawPath(context, newOffset);
    setTimeout(this.animatePath(context, newOffset), 200);
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