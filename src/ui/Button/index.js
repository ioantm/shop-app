import React, {Component, Children, PropTypes} from 'react';
import ButtonStyle from './ButtonStyle';
import theme from '../theme';

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {hovered: false};
  }

  toggleMouseHovered = hovered => () => {
    this.setState({hovered});
  };
  mouseEnterHandler = this.toggleMouseHovered(true);
  mouseLeaveHandler = this.toggleMouseHovered(false);

  render() {
    const {children, styles, primary, ...restProps} = this.props;
    const {hovered} = this.state;

    return (
      <ButtonStyle
        {...restProps}
        {...theme}
        primary={primary}
        hovered={hovered}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        {Children.toArray(children)}
      </ButtonStyle>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.object,
  primary: PropTypes.bool
};

export default Button;
