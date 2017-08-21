import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ButtonComponent = ({onClickInput, OnClick, text}) => {
    return (
        <button onClick={ () => onClick(onClickInput) }>{text}</button>
    )
};

ButtonComponent.PropTypes = {
    history: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }),
    onClick: PropTypes.func.isRequired,
    onClickInput: PropTypes.isRequired,
    text: PropTypes.string.isRequired
};

export default withRouter(ButtonComponent);