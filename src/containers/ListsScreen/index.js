import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listsSelector } from '../../store/mainReducer';
import Lists from '../../components/Lists';
import * as listsActions from '../../store/lists/actions';

class ListsScreen extends Component {
  props: {
    // eslint-disable-line
    lists: Array<{}>,
    createList: () => any,
    getListsRequest: () => any,
    deleteList: () => any,
    match: object
  };

  componentDidMount() {
    this.props.getListsRequest();
  }

  render() {
    const { lists, createList, deleteList, match } = this.props;
    return (
      <Lists
        pathname={match.path}
        lists={lists}
        createList={createList}
        deleteList={deleteList}
      />
    );
  }
}

const mapStateToProps = state => ({
  lists: listsSelector(state)
});

export const mapDispatchToProps = dispatch => ({
  createList: list => dispatch(listsActions.createListRequest(list)),
  getListsRequest: () => dispatch(listsActions.getListsRequest()),
  deleteList: listId => dispatch(listsActions.deleteListRequest(listId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsScreen);
