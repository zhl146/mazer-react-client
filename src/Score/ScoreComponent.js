import React from 'react';
import PropTypes from 'prop-types';

const ScoreComponent = ({score}) => {
    return (
        <div className='ScoreBoard'>
            SCORE: {score}
        </div>
    )
}

ScoreComponent.PropTypes = {
    score: PropTypes.number.isRequired
};

export default ScoreComponent;