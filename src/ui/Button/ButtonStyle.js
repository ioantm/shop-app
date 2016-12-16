import { styled } from 'styletron-react';

export default styled('button', ({ primary, hovered, fontFamily, primaryTextColor }) => {
  return {
    display: 'inline-block',
    boxSizing: 'border-box',
    padding: '0.4em 2em',
    textDecoration: 'none',
    borderRadius: '4px',
    '-webkit-font-smoothing': 'antialiased',
    '-webkit-touch-callout': 'none',
    userSelect: 'none',
    cursor: 'pointer',
    outline: 0,
    'font-family': fontFamily || 
      "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 'bold',
    fontSize: '16px',
    border: `2px solid ${primary}`,
    color: primaryTextColor,
    background: `${primary}`,
    boxShadow: hovered ? `0px 0px 0px 2px ${primary}` : 'none',
    transition: '0.1s ease-in-out',
};
});
