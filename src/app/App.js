import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './App.css';
import { center } from '../styles/layout';
import { logout, getLists } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.getLists()
      .then(() => browserHistory.push('/lists'))
      .catch((err) => {
        console.log('err', err);
        if (err.status === 401) {
          browserHistory.push('/signin');
        }
      });
  }

  render() {
    return (
      <div className={styles.App}>
        <h2>Shopping List App</h2>
        { 
          this.props.children
        }
      </div>
    );
  }
}

App.propTypes = {
  logout: React.PropTypes.func,
}

const mapStateToProps = (state) => ({
  isAuthenticated: getSessionUserId(state)
});

const mapDispatchToProps = dispatch => ({
  getLists: () => dispatch(getLists()),
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(App);
