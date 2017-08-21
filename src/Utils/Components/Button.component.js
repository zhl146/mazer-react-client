import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({onClickInput, OnClick, text, cssAttributes, history}) => {
    return (
        <button onClick={ () => OnClick(onClickInput, history) } className={ cssAttributes }>{text}</button>
    )
};

ButtonComponent.PropTypes = {
    onClick: PropTypes.func.isRequired,
    onClickInput: PropTypes.isRequired,
    text: PropTypes.string.isRequired
};

export default ButtonComponent;