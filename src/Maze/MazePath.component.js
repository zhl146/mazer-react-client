import React from 'react'
import PropTypes from 'prop-types'

const MazePath = ({ maze }) => {
    const pathSegments = maze.findPath();

    function generatePathString(pathSegment) {
      return pathSegment.reduce( (string, point, index) => {
        let operation = '';
        if (index !== 0) {
          operation = 'L'
        }
        return string + operation + point.x + ' ' + point.y + ' ';
      }, 'M ')
    }

    function renderPath() {
      return pathSegments.map( (segment, index) => (
          <path key={index} d={generatePathString(segment)} />
      ))
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <g className="svg-paths svg-paths-dashed">{ renderPath() }</g>
        </svg>
    )
};

export default MazePath;