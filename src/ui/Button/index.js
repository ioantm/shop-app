import React, { Component, Children, PropTypes } from 'react';
import ButtonStyle from './ButtonStyle';
import theme from '../theme';

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };
  }

  toggleMouseHovered = hovered => () => {
    this.setState({ hovered });
  }
  mouseEnterHandler = this.toggleMouseHovered(true)
  mouseLeaveHandler = this.toggleMouseHovered(false)

  render() {
    const { children } = this.props;
    const { hovered } = this.state;

    return (
      <ButtonStyle
        {...theme}
        hovered={hovered}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        { Children.toArray(children) }
      </ButtonStyle>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
