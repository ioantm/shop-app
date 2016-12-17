import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { listsSelector } from '../reducers';

function Lists({ lists }) {
  return (
    <ul>
      {
        lists.map(list => (
          <li key={list.id}>{list.name}</li>
        ))
      }
    </ul>
  );
}

Lists.propTypes = {
  lists: PropTypes.arrayOf(React.PropTypes.object)
}

const mapStateToProps = state => ({
  lists: listsSelector(state),
});

export default connect(mapStateToProps, null)(Lists);