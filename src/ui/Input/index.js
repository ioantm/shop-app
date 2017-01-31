import React, {Component} from 'react';
import {InputContainer, StyledInput} from './InputStyle';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {focused: false};
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  focusHandler = () => this.setState({focused: true});
  blurHandler = () => this.setState({focused: false});
  containerClickHandler = () => this.input.focus();

  render() {
    return (
      <InputContainer
        onClick={this.containerClickHandler}
        focused={this.state.focused}
      >
        <StyledInput
          {...this.props}
          innerRef={comp => {
              this.input = comp;
            }}
          onFocus={this.focusHandler}
          onBlur={this.blurHandler}
        />
      </InputContainer>
    );
  }
}

export default Input;
