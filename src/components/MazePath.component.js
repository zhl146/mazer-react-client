import React from 'react'
import PropTypes from 'prop-types'

const MazePath = ({ maze }) => {
    const pathSegments = maze.findPath();

    //const tileSize = parentWidth / maze.params.numColumns;
    const tileSize = 40; // this is here just so we can test pathfinding we will move to automatically calculating later
    const tileOffset = tileSize / 2;

    function translatePointCoords(x, y) {
      const translatedX = x * tileSize + tileOffset;
      const translatedY = y * tileSize + tileOffset;
      return translatedX + ' ' + translatedY;
    }

    function generatePathString(pathSegment) {
      return pathSegment.reduce( (string, point, index) => {
        let operation = '';
        if (index !== 0) {
          operation = 'L'
        }
        return string + operation + translatePointCoords(point.x, point.y) + ' ';
      }, 'M')
    }

    function renderPath() {
      return pathSegments.map( (segment, index) => (
          <path key={index} stroke={maze.params.mazeColors.pathColors[index]} d={generatePathString(segment)} />
      ))
    }

    return (
        <svg className="maze-path" xmlns="http://www.w3.org/2000/svg">
            <g className="svg-paths svg-paths-dashed">{ renderPath() }</g>
        </svg>
    )
};

MazePath.PropTypes = {
  maze: PropTypes.object.isRequired
};

export default MazePath;