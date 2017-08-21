import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({onClickInput, OnClick, text, cssAttributes}) => {
    return (
        <button onClick={ () => onClick(onClickInput) } className={ cssAttributes }>{text}</button>
    )
};

ButtonComponent.PropTypes = {
    onClick: PropTypes.func.isRequired,
    onClickInput: PropTypes.isRequired,
    text: PropTypes.string.isRequired
};

export default ButtonComponent;