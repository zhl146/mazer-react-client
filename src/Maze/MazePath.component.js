import React from 'react'
import PropTypes from 'prop-types'

const MazePath = ({ maze }) => {
    const pathSegments = maze.findPath();

    function getTileCenter(tile) {

    }

    function generatePathString(pathSegment) {
      return pathSegment.reduce( (string, point, index) => {
        let operation = '';
        if (index !== 0) {
          operation = 'L'
        }
        return string + operation + getTileCenter(point);
      }, 'M ')
    }

    function renderPath() {
      return pathSegments.map( (segment) => (
          <path stroke="black" d={generatePathString(segment)} />
      ))
    }

    return (
        <svg>
            <g>{ renderPath() }</g>
        </svg>
    )
};

export default MazePath;