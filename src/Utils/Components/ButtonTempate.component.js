import React from 'react';
import PropTypes from 'prop-types';

const ButtonTemplate = ( {onClickInput, OnClick, text, cssAttributes, history}) => {
    return (
        <button onClick={ () => { OnClick(onClickInput, history) } } className={ cssAttributes }>{text}</button>
    )
};

ButtonTemplate.PropTypes = {
    onClick: PropTypes.func.isRequired,
    onClickInput: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
};

export default ButtonTemplate;