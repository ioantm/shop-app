import React, { Component, PropTypes } from 'react';
import { styled } from 'styletron-react';
import { Button, Input } from '../../ui';
import { Flex1 } from '../../ui/layout';

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

class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingCreate: false,
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
            Create new list
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
          <Button onClick={this.addListclickHandler}>Add</Button>
        </StyledContainer>
      )
    );
  }
}

CreateContainer.propTypes = {
  createHandler: PropTypes.func.isRequired,
};

export default CreateContainer;