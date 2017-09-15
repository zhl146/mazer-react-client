import React from 'react';
import { number, func, string } from 'prop-types';

import { ButtonTemplate } from '../../../Utils/Components/ButtonTempate.component';

ResetButton.propTypes = {
  seed: number,
  cssAttributes: string.isRequired,
  onResetClick: func.isRequired
};

export function ResetButton({ seed, onResetClick, cssAttributes}) {
  return (
      <ButtonTemplate onClickInput={seed}
                      clickHandler={onResetClick}
                      cssAttributes={cssAttributes}
                      text="Reset" />
  );
}