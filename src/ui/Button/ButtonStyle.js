import { styled } from 'styletron-react';
import theme, { buttonTheme, primaryButtonTheme } from '../theme';

export default styled('button',
  ({ primary, styles, hovered }) => (
    Object.assign(
      {},
      buttonTheme, primary && primaryButtonTheme,
      {
        boxShadow: hovered ? `0px 0px 0px 2px ${theme.primaryColor}` : 'none',
      },
      styles,
    )
  ),
);
