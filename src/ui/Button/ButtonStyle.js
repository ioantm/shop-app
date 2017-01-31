import styled from 'styled-components';

export default styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.4em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased,
  -webkit-touch-callout: none,
  userSelect: none,
  cursor: pointer,
  outline: 0,
  font-family: ${props => props.theme.fontFamily},
  fontWeight: bold;
  fontSize: 16px;
  border: 2px solid ${props => props.theme.primaryColor};
  color: ${props => props.theme.buttonColor};
  background: transparent;
  transition: "0.1s ease-in-out"
`
