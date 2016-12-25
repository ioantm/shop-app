import React, { Component } from 'react';
import { LayoutHorizontal } from '../../ui/layout';
import { Input, Button } from '../../ui';

const inputStyles = {
  marginBottom: 0,
  marginRight: '10px',
};

type Props = {
  addHandler: () => void
}

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onChange = e => this.setState({ name: e.target.value })
  clickHandler = () => this.props.addHandler(this.state.name)
  props: Props;

  render() {
    return (
      <LayoutHorizontal center>
        <Input
          styles={inputStyles} 
          onChange={this.changeHandler}
        />
        <Button
          onClick={this.clickHandler}
        >
          Add
        </Button>
      </LayoutHorizontal>
    );
  }
}

export default AddItem;
