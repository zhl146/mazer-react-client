import React from 'react';
import { func, object, string} from 'prop-types';

ButtonTemplate.PropTypes = {
  onClick: func.isRequired,
  onClickInput: object.isRequired,
  text: string.isRequired
};

export function ButtonTemplate( {onClickInput,
                                  clickHandler,
                                  text,
                                  cssAttributes,
                                  disabled}){
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
}
