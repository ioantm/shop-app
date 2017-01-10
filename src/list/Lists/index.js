import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { listsSelector } from '../../reducers';
import { ListItem, Button } from '../../ui';
import { ListsContainer } from './ListsStyles';
import CreateContainer from '../CreateContainer';
import { LayoutVertical, LayoutHorizontal, Flex1 } from '../../ui/layout';
import * as actions from '../../actions';

const ListItemView = ({ selectList, children, list, ...rest }) =>(
  <ListItem
    {...rest}
    onClick={() => selectList(list)}
  >
    {children}
  </ListItem>
);

ListItemView.propTypes = {
  selectList: PropTypes.func.isRequired,
  children: PropTypes.node,
  list: PropTypes.object,
};

class Lists extends Component {
  props: { // eslint-disable-line
    lists: Array<{}>,
    createList: () => any,
    selectList: () => any,
    getListsRequest: () => any,
    deleteList: () => any,
  }

  componentDidMount() {
    this.props.getListsRequest();
  }

  render() {
    const { lists, createList, selectList } = this.props;

    return (
      <LayoutVertical stretch>
        <ListsContainer>
          {
            lists.map((list, index) => (
              <ListItemView
                list={list}
                isFirst={index === 0}
                isLast={index === list.length - 1}
                selectList={selectList}
                key={list._id}
              >
                <LayoutHorizontal flex={1}>
                  {list.name}
                  <Flex1 />
                  <Button
                    onClick={() => this.props.deleteList(list._id)}
                  >
                    Delete
                  </Button>
                </LayoutHorizontal>
              </ListItemView>
            ))
          }
        </ListsContainer>
        <CreateContainer createHandler={createList}>
          {
            ['Add new list', 'Add']
          }
        </CreateContainer>
      </LayoutVertical>
    );
  }
}

const mapStateToProps = state => ({
  lists: listsSelector(state),
});

export const mapDispatchToProps = dispatch => ({
  createList: list => dispatch(actions.createListRequest(list)),
  selectList: (list) => {
    dispatch(actions.selectList(list._id));
  },
  getListsRequest: () => dispatch(actions.getListsRequest()),
  deleteList: listId => dispatch(actions.deleteList(listId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
