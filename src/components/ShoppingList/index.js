import React from 'react';
import { ListItem, Button } from '../../ui';
import { LayoutVertical } from '../../ui/layout';
import { ListContainer, ListTitle, ItemText } from './ShoppingListStyles';
import AddInput from '../AddInput';

const renderItems = (items, deleteItem) =>
  items.map(({ name, _id }) => (
    <ListItem
      alignSelf="end"
      key={_id}
    >
      <ItemText>
        {name}
      </ItemText>
      <Button
        onClick={() => deleteItem(_id)}
      >
        Delete
      </Button>
    </ListItem>
  ));

type Props = {
  items: Array<object>,
  title: string,
  addItem: () => void,
  deleteItem: (id: string) => void,
};

export default ({ items, title, addItem, deleteItem }: Props) =>
  (
    <LayoutVertical flex stretch>
      <ListTitle>{title}</ListTitle>
      <ListContainer>
        {renderItems(items, deleteItem)}
      </ListContainer>
      <AddInput createHandler={addItem}>
        {
          ['+', 'Add']
        }
      </AddInput>
    </LayoutVertical>
  );