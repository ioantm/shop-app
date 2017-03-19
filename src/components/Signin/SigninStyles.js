import { styled } from 'styletron-react';
import { BodyText, Input, Link, Button } from '../../ui';

const inputItemStyles = {
  marginBottom: '10px'
};

export const LoginButton = styled(Button, {
  color: 'white',
  ...inputItemStyles
});

export const RegisterLink = styled(Link, {
  marginLeft: '20px'
});

export const RegisterText = styled(BodyText, {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SigninInput = styled(Input, inputItemStyles);



