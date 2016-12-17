import { styled } from 'styletron-react';
import { inputContainerTheme, inputFocusColor, inputTheme } from '../theme';

export const InputContainer = styled('div', ({ focused, styles }) => 
  Object.assign(
    {}, 
    inputContainerTheme,
    focused && {
      borderColor: inputFocusColor,
    },
    styles,
  ));

export const StyledInput = styled('input', () => inputTheme);
