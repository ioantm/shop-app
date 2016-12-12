import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout, getLists } from '../actions';

class App extends Component {
  componentDidMount() {
    console.log('component did mount', this.props);

    this.props.getLists()
      .then(() => browserHistory.push('/lists'))
      .catch((err) => {
        if (err.status === 401) {
          browserHistory.push('/signin');
        }
      });
  }

  render() {
    return (
      <div>
        <h2>Shopping List App</h2>
        { 
          this.props.children
        }
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  logout: React.PropTypes.func,
  getLists: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getLists: () => dispatch(getLists()),
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(App);
