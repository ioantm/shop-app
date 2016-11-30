import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
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

export default App;