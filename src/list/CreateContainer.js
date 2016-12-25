// @flow
import React, { Component } from 'react';
import { styled } from 'styletron-react';
import { Button, Input } from '../ui';
import { Flex1 } from '../ui/layout';

const StyledContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  padding: '12px 0',
  alignItems: 'center',
});

const inputStyles = {
  marginBottom: '0',
  marginRight: '10px',
  flex: 1,
};

type Props = {
  createHandler: () => void,
  children: Array<string>,
}

class CreateContainer extends Component {
  props: Props;

  state: {
    pendingCreate: boolean;
    listName: string;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      pendingCreate: false,
      listName: '',
    };
  }

  createClickHandler = () => this.setState({ pendingCreate: true })
  addListclickHandler = () => this.props.createHandler({ name: this.state.listName })
  inputChangeHandler = e => this.setState({ listName: e.target.value })

  render() {
    return (
      !this.state.pendingCreate ? (
        <StyledContainer>
          <Flex1 />
          <Button
            onClick={this.createClickHandler}
          >
            {this.props.children[0]}
          </Button>
        </StyledContainer>
      )
      : (
        <StyledContainer>
          <Input
            styles={inputStyles}
            onChange={this.inputChangeHandler}
            ref={component => component && component.focus()}
          />
          <Button onClick={this.addListclickHandler}>
            {
              this.props.children[1]
            }
          </Button>
        </StyledContainer>
      )
    );
  }
}

export default CreateContainer;