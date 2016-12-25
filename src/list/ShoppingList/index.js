import React from 'react';
import { connect } from 'react-redux';
import { ListItem } from '../../ui';
import { LayoutVertical } from '../../ui/layout';
import { selectedList } from '../../reducers';
import { ListContainer, ListTitle } from './ShoppingListStyles';
import * as actions from '../../actions';
import AddItem from './AddItem';

const renderItems = items =>
  items.map(item => (
    <ListItem>{item.name}</ListItem>
  ));

const ShoppingList =
  ({ items, title, addItem }:
   {
     items: Array<object>,
     title: string,
     addItem: () => void
   }) =>
  (
    <LayoutVertical>
      <ListContainer>
        <ListTitle>{title}</ListTitle>
        {renderItems(items)}
      </ListContainer>
      <AddItem addHandler={addItem} />
    </LayoutVertical>
  );

const mapStateToProps = (state) => {
  const list = selectedList(state) || { name: '', shoppingItems: [] };

  return {
    title: list.name,
    items: list.shoppingItems,
  };
};

const mapDispatchToProps = dispatch => ({
  addItem: name => dispatch(actions.addShoppingItem(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
