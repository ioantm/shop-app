import { styled } from 'styletron-react';
import React from 'react';
import classNames from 'classnames';
import titleStyles from './title.sass';

export const paperCommonBase = {
  fontFamily: "'Roboto', 'Noto', sans-serif",
  '-webkit-font-smoothing': 'antialiased'
};

export const paperfontCommonNowrap = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export const Display2 = styled('h2', {
  ...paperCommonBase,
  fontSize: '45px',
  fontWeight: '400',
  letterSpacing: '-.018em',
  lineHeight: '48px'
});

export const Display1 = styled('h2', {
  ...paperCommonBase,
  fontSize: '34px',
  fontWeight: '400',
  letterSpacing: '-.018em',
  lineHeight: '48px'
});

type TitleProps = {
  children: ReactElement,
  lvl?: number
};

export const Title = ({ children, lvl }: TitleProps) => (
  <h2
    className={classNames(titleStyles.title, {
      [titleStyles[`is-${lvl}`]]: lvl > 0
    })}
  >
    {children}
  </h2>
);

export const BodyText = styled('p', {
  ...paperCommonBase,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  margin: '0px'
});
