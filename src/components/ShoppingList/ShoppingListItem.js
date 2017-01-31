import React, { PureComponent } from 'react';
import { ListItem, Button } from '../../ui';
import { ItemText, StyledCheckbox } from './ShoppingListStyles';
import { hoverBehavior } from '../behaviors';

type Props = {
  deleteClick(): any,
  completionCheckboxChange(checked: boolean): any,
  name: string,
  id: string,
  completed: boolean,
  isHovered: boolean
};

class ShoppingListItem extends PureComponent {
  props: Props;
  checkboxChangeHandler = e => this.props.completionCheckboxChange(e.target.checked);

  render() {
    const {
      name,
      deleteClick,
      isHovered,
      completed,
      ...rest
    } = this.props;

    return (
      <ListItem {...rest}>
        <StyledCheckbox
          checked={completed}
          onChange={this.checkboxChangeHandler}
        />
        <ItemText>
          {name}
        </ItemText>
        {isHovered && (
          <Button onClick={deleteClick}>
            Delete
          </Button>
        )}
      </ListItem>
    );
  }
};

export default hoverBehavior(ShoppingListItem);
