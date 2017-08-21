import React from 'react'
import PropTypes from 'prop-types'

const MazePath = (props) => {
    const pathString = 'derptown';
    return (
        <svg>
            <g>
                <path stroke={stroke} d={pathString}/>
            </g>
        </svg>
    )
};

export default MazePath;