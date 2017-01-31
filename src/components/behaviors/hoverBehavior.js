import React, { Component } from 'react';

type State = { isHovered: boolean };
type Props = { children: Array<any> };

export default InnerComponent => class extends Component {
  state: State;
  props: Props;
  constructor() {
    super();
    this.state = { isHovered: false };
  }

  mouseEnter = () => this.setState({ isHovered: true });
  mouseLeave = () => this.setState({ isHovered: false });
  render() {
    const { children, ...rest } = this.props;
    return (
      <InnerComponent
        {...rest}
        isHovered={this.state.isHovered}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {children}
      </InnerComponent>
    );
  }
};
