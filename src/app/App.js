// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout, getLists, navigateToLists } from '../actions';
import { styled } from 'styletron-react';
import { getSessionUserId } from '../reducers';
import { Button } from '../ui';

type Props = {
  children: {},
  logout: () => void,
  getLists: () => Promise<[]>,
  haveSession: boolean,
  isLoading: boolean,
  navigateToLists: () => Promise<*>
};

class App extends Component {
  props: Props;

  componentDidMount() {
    this.props.getLists()
      .then(() => this.dispatch(this.props.navigateToLists()));
  }

  getContent() {
    return (
      <AppContainer>
        <h2>Shopping List App</h2>
        {
          this.props.children
        }
      </AppContainer>
    );
  }

  render() {
    return (
      <div>
        <AppHeader>
          <Flex1 />
          <Button
            onClick={this.props.logout}
          >
            Logout
          </Button>
        </AppHeader>
        { this.props.isLoading ? 'Loading... ' : this.getContent() }
      </div>
    );
  }
}

const AppContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Flex1 = styled('div', {
  flex: 1,
});
const AppHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  paddingRight: '10px',
});

const mapDispatchToProps = dispatch => ({
  getLists: () => dispatch(getLists()),
  logout: () => dispatch(logout()),
  navigateToLists: (location, action) => dispatch(navigateToLists()),
});

const mapStateToProps = state => ({
  haveSession: getSessionUserId(state) != null,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
