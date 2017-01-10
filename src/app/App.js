// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { styled } from 'styletron-react';
import { getSessionUserId } from '../reducers';
import { Button } from '../ui';

type Props = {
  children: {},
  logout: () => void,
  haveSession: boolean,
  isLoading: boolean,
};

class App extends Component {
  props: Props;

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
  logout: () => dispatch(actions.logoutRequest()),
});

const mapStateToProps = state => ({
  haveSession: getSessionUserId(state) != null,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
