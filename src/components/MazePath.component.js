import React, { Component } from 'react'
import PropTypes from 'prop-types'

// const MazePath = ({ maze }) => {
//     const pathSegments = maze.findPath();
//
//     //const tileSize = parentWidth / maze.params.numColumns;
//     const tileSize = 40; // this is here just so we can test pathfinding we will move to automatically calculating later
//     const tileOffset = tileSize / 2;
//
//     function translatePointCoords(x, y) {
//       const translatedX = x * tileSize + tileOffset;
//       const translatedY = y * tileSize + tileOffset;
//       return translatedX + ' ' + translatedY;
//     }
//
//     function generatePathString(pathSegment) {
//       return pathSegment.reduce( (string, point, index) => {
//         let operation = '';
//         if (index !== 0) {
//           operation = 'L'
//         }
//         return string + operation + translatePointCoords(point.x, point.y) + ' ';
//       }, 'M')
//     }
//
//     function renderPath() {
//       return pathSegments.map( (segment, index) => (
//           <path key={index} stroke={maze.params.mazeColors.pathColors[index]} d={generatePathString(segment)} />
//       ))
//     }
//
//     return (
//         <svg className="maze-path" xmlns="http://www.w3.org/2000/svg">
//             <g className="svg-paths svg-paths-dashed">{ renderPath() }</g>
//         </svg>
//     )
// };

class MazePath extends Component {

  //const tileSize = parentWidth / maze.params.numColumns;
  tileSize = 40; // this is here just so we can test pathfinding we will move to automatically calculating later
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
      console.log(xCoord,yCoord);
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