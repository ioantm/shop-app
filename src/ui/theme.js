const theme = {
  primaryColor: '#8657D9',
  fontFamily: '"Work Sans",Arial,sans-serif',
  buttonColor: 'black',
  buttonColorPrimary: 'white',
};

// buttons

export const buttonTheme = {
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
  'font-family': theme.fontFamily,
  fontWeight: 'bold',
  fontSize: '16px',
  border: `2px solid ${theme.primaryColor}`,
  color: theme.buttonColor,
  background: 'transparent',
  transition: '0.1s ease-in-out',
};

export const primaryButtonTheme = {
  color: theme.buttonColorPrimary,
  background: theme.primaryColor,
};

// link

export const linkStyles = {
  color: theme.primaryColor,
  fontSize: '1.1875rem',
  lineHeight: '24px',
  fontWeight: '600',
  fontFamily: theme.fontFamily,
  textDecoration: 'none'
};

// input

export const inputContainerTheme = {
  padding: '6px 24px',
  border: '1px solid rgba(0,0,0,0.15)',
  background: 'white',
  display: 'flex',
  cursor: 'text',
  marginBottom: '10px',
  color: '#333',
};

export const inputTheme = {
  fontFamily: theme.fontFamily,
  height: '36px',
  flex: 1,
  border: 'none',
  fontSize: '1rem',
  lineHeight: '1.5',
  backgroundColor: 'transparent',
  outline: 'none',
};

export const inputFocusColor = '#00cceb';

// list

export const listItemTheme = {
  borderBottom: '1px solid rgba(0,0,0,0.15)',
  borderTop: '1px solid rgba(0,0,0,0.15)',
  padding: '12px 24px',
  display: 'flex',
  listStyleType: 'none',
  fontFamily: theme.fontFamily,
};

export default theme;
