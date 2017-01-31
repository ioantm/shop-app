import React, { PureComponent, Component } from 'react';
import { LayoutVertical } from '../../ui/layout';
import { ListContainer, ListTitle } from './ShoppingListStyles';
import AddInput from '../AddInput';
import ShoppingListItem from './ShoppingListItem';

type Props = {
  items: Array<object>,
  title: string,
  addItemClick(): void,
  deleteClick(id: string): void,
  completionCheckboxChange(id: string, checked: boolean): any
};

class List extends PureComponent {
  props: {
    items: Array<node>,
    deleteClick(): any,
    completionCheckboxChange(id: string, checked: boolean): any
  };

  render() {
    const { items, deleteClick, completionCheckboxChange } = this.props;

    return (
      <ListContainer>
        {
          items.map(({ id, ...rest }, index) => (
            <ShoppingListItem
              isFirst={index === 0}
              alignSelf="end"
              key={id}
              {...rest}
              completionCheckboxChange={(checked) => completionCheckboxChange(id, checked)}
              deleteClick={() => deleteClick(id)}
            />
          ))
        }
      </ListContainer>
    );
  }
}

export default class ShoppingList extends PureComponent {
  props: Props;
  render() {
    const {
      items,
      title,
      addItemClick,
      deleteClick,
      completionCheckboxChange
    } = this.props;

    return (
      <LayoutVertical flex stretch>
        <ListTitle>{title}</ListTitle>
        <List
          items={items}
          deleteClick={deleteClick}
          completionCheckboxChange={completionCheckboxChange}
        />
        <AddInput createHandler={addItemClick}>
          {['+', 'Add']}
        </AddInput>
      </LayoutVertical>
    );
  }
}
