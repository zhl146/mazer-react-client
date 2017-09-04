import React from 'react';
import PropTypes from 'prop-types';

const ButtonTemplate = ( {onClickInput, OnClick, text, cssAttributes, disabled}) => {
    console.log('disabled: '+disabled);
    if(disabled) {
        return (
            <button
                disabled onClick={() => {
                    OnClick(onClickInput)
                }}
                className={cssAttributes}
            >{text}</button>
        )
    }else{
        return (
            <button
                onClick={() => {
                    OnClick(onClickInput)
                }}
                className={cssAttributes}
            >{text}</button>
        )
    }
};

ButtonTemplate.PropTypes = {
    onClick: PropTypes.func.isRequired,
    onClickInput: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
};

export default ButtonTemplate;