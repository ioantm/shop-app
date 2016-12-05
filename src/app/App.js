import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './App.css';
import { center } from '../styles/layout';
import { logout } from '../actions';

class App extends Component {
  render() {
    return (
      <div className={styles.App} {...center}>
        <h2>Shopping List App</h2>
        <button onClick={this.props.logout}>Logout</button>
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

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(App);
