import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as shoppingListActions
  from '../../store/shoppingList/actions';
import * as listsActions from '../../store/lists/actions';
import ShoppingList from '../../components/ShoppingList';
import {
  getShoppingItemsSelector
} from '../../store/shoppingList/selectors';
import { listSelector } from '../../store/lists/selectors';
import * as shoppingListSelectors
  from '../../store/shoppingList/selectors';

class ShoppingListScreen extends Component {
  props: {
    //eslint-disable-line
    list: Object,
    getLists(listIds: [string]): any,
    addItem(): any,
    deleteItem(itemId: string): any,
    changeChecked(id: string, checked: boolean): any,
    match: { params: { listId: string } }
  };
  
  componentDidMount() {
    const { getLists, list } = this.props;
    if (!list) {
      getLists([this.props.match.params.listId]);
    }
  }

  completionCheckboxChangeHandler = (id, checked) =>
    this.props.changeChecked(id, checked);
  deleteClickHandler = id => this.props.deleteItem(id);
  addItemClickHandler = item => this.props.addItem(item);

  render() {
    if (!this.props.list) {
      return <p>Loading...</p>;
    }
    const { list } = this.props;
    console.log('render ShoppingListScreen', list.shoppingItems);
    return (
      <ShoppingList
        addItemClick={this.addItemClickHandler}
        deleteClick={this.deleteClickHandler}
        completionCheckboxChange={
          this.completionCheckboxChangeHandler
        }
        items={list.shoppingItems}
        title={list.name}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const listId = ownProps.match.params && ownProps.match.params.listId;
  const list = listSelector(state, listId);
  return {
    list: (
      list &&
        Object.assign({}, list, {
          shoppingItems: getShoppingItemsSelector(state, listId)
        })
    )
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: item =>
    dispatch(
      shoppingListActions.addShoppingItemRequest(
        item,
        ownProps.match.params.listId
      )
    ),

  deleteItem: itemId =>
    dispatch(
      shoppingListActions.deleteShoppingItemRequest(
        itemId,
        ownProps.match.params.listId
      )
    ),

  getLists: listIds =>
    dispatch(listsActions.getListsRequest(listIds, true)),

  changeChecked: (id, checked) => {
    dispatch(
      shoppingListActions.editShoppingItemRequest(
        id,
        { completed: checked },
        ownProps.match.params.listId
      )
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ShoppingListScreen
);
