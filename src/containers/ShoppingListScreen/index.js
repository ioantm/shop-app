import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as shoppingListActions from '../../store/shoppingList/actions';
import ShoppingList from '../../components/ShoppingList';
import { listsMap, shoppingItemsMap } from '../../store/mainReducer';

class ShoppingListScreen extends PureComponent {
  props: {//eslint-disable-line
    shoppingItems: Array<object>,
    name: string,
    getLists: () => any,
    addItem: () => any,
    deleteItem: (itemId: string) => any,
  }

  componentDidMount() {
    const {
      getLists,
      shoppingItems,
    } = this.props;

    if (!shoppingItems) {
      getLists();
    }
  }

  render() {
    if (!this.props.shoppingItems) {
      return <p>Loading...</p>;
    }
    const { shoppingItems, name, deleteItem } = this.props;
    return (
      <ShoppingList
        addItem={this.props.addItem}
        deleteItem={deleteItem}
        items={shoppingItems}
        title={name}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const list = listsMap(state)[ownProps.params && ownProps.params.listId];
  let shoppingItems;
  let name;

  if (list) {
    shoppingItems = list.shoppingItems.filter(id => id)
                             .map(id => shoppingItemsMap(state)[id]);
    name = list.name;
  }

  return {
    name,
    shoppingItems,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: item => 
    dispatch(shoppingListActions.addShoppingItemRequest(item, ownProps.params.listId)),
  deleteItem: itemId =>
    dispatch(shoppingListActions.deleteShoppingItemRequest(itemId, ownProps.params.listId)),
  getLists: () => dispatch(shoppingListActions.getListsRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingListScreen);

