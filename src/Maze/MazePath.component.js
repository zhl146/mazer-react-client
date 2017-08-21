import React from 'react'
import PropTypes from 'prop-types'

const MazePath = ({ maze, parentElement }) => {
    const pathSegments = maze.findPath();

    console.log(parentElement)

    function getTileCenter(tile) {

    }

    function generatePathString(pathSegment) {
      return pathSegment.reduce( (string, point, index) => {
        let operation = '';
        if (index !== 0) {
          operation = 'L'
        }
        return string + operation + ' ' + point.x*10 + ' ' + point.y*10 + ' ';
      }, 'M ')
    }

    function renderPath() {
      return pathSegments.map( (segment, index) => (
          <path key={index} d={generatePathString(segment)} />
      ))
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <g>{ renderPath() }</g>
        </svg>
    )
};

export default MazePath;