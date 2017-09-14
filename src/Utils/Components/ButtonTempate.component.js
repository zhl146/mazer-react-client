import React from 'react';
import PropTypes from 'prop-types';

const ButtonTemplate = ( {onClickInput, clickHandler, text, cssAttributes, disabled}) => {
    console.log('disabled: '+disabled);
    if(disabled) {
        return (
            <button
                disabled
                className={cssAttributes}
            >{text}</button>
        );
    }else{
        return (
            <button
                onClick={() => {
                    clickHandler(onClickInput);
                }}
                className={cssAttributes}
            >{text}</button>
        );
    }
};

ButtonTemplate.PropTypes = {
    onClick: PropTypes.func.isRequired,
    onClickInput: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
};

export default ButtonTemplate;