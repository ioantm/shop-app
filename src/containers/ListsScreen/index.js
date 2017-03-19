import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listsSelector } from '../../store/mainReducer';
import AddInput from '../../components/AddInput';
import Lists from '../../components/Lists';
import { LayoutVertical } from '../../ui/layout';
import { Title } from '../../ui';
import * as listsActions from '../../store/lists/actions';

class ListsScreen extends Component {
  props: { // eslint-disable-line
    lists: Array<{}>,
    createList: () => any,
    getListsRequest: () => any,
    deleteList: () => any,
    match: object
  }

  componentDidMount() {
    this.props.getListsRequest();
  }

  render() {
    const { lists, createList, deleteList, match } = this.props;
    return (
      <LayoutVertical stretch flex>
        <Title>Lists</Title>
        <Lists
          pathname={match.path}
          lists={lists}
          deleteList={deleteList}
        />
        <AddInput createHandler={createList}>
          {
            ['Add new list', 'Add']
          }
        </AddInput>
      </LayoutVertical>
    );
  }
}

const mapStateToProps = state => ({
  lists: listsSelector(state),
});

export const mapDispatchToProps = dispatch => ({
  createList: list => dispatch(listsActions.createListRequest(list)),
  getListsRequest: () => dispatch(listsActions.getListsRequest()),
  deleteList: listId => dispatch(listsActions.deleteListRequest(listId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsScreen);
