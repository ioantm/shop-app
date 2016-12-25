import React, { Component, PropTypes } from 'react';
import { InputContainer, StyledInput } from './InputStyle';
import theme from '../theme';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  focus() {
    this.input && this.input.focus();
  }

  focusHandler = () => this.setState({ focused: true })
  blurHandler = () => this.setState({ focused: false })
  containerClickHandler = () => this.input.focus()

  render() {
    const { styles, ...rest } = this.props;

    return (
      <InputContainer
        {...theme}
        styles={styles}
        onClick={this.containerClickHandler}
        focused={this.state.focused}
      >
        <StyledInput
          {...rest}
          innerRef={(comp) => { this.input = comp; }}
          onFocus={this.focusHandler}
          onBlur={this.blurHandler}
        />
      </InputContainer>
    );
  }
}

Input.propTypes = {
  styles: PropTypes.object,
};

export default Input;
