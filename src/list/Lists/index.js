import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { listsSelector } from '../../reducers';
import { ListItem } from '../../ui';
import { ListsContainer } from './ListsStyles';
import CreateContainer from './CreateContainer';
import { LayoutVertical } from '../../ui/layout';
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
  listItemTapHandler = (list) => {
    console.log('tap handler', list);
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
                {list.name}
              </ListItemView>
            ))
          }
        </ListsContainer>
        <CreateContainer createHandler={createList} />
      </LayoutVertical>
    );
  }
}



Lists.propTypes = {
  lists: PropTypes.arrayOf(React.PropTypes.object),
  createList: PropTypes.func.isRequired,
  selectList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lists: listsSelector(state),
});

export const mapDispatchToProps = dispatch => ({
  createList: list => dispatch(actions.createList(list)),
  selectList: (list) => {
    dispatch(actions.selectList(list._id));
    browserHistory.push(`/lists/${list._id}`);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);