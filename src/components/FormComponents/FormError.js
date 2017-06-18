// @flow
import React from 'react';
import glamorous from 'glamorous';

type Props = {
  error: ?string
};

const ErrorText = glamorous.p({
  color: 'rgb(199, 39, 35)'
});

const FormWithError = (FormInput: Class<React$Component<any, any, any>>) => ({
  error,
  ...rest
}: Props) => (
  <div>
    <FormInput {...rest} />
    { error && <ErrorText>{error}</ErrorText> }
  </div>
)

export default FormWithError;
