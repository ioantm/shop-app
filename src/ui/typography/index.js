import { styled } from 'styletron-react';

export const paperCommonBase = {
  'fontFamily': "'Roboto', 'Noto', sans-serif",
  '-webkit-font-smoothing': 'antialiased'
}

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

export const Title = styled('h2', ({ center }) => ({
  textAlign: center ? 'center' : 'left',
  ...paperCommonBase,
  ...paperfontCommonNowrap,
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '28px'
}));

export const BodyText = styled('p', {
  ...paperCommonBase,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  margin: '0px'
});


