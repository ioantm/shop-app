// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sessionActions from '../store/session/actions';
import { styled } from 'styletron-react';
import { getSessionUserId } from '../store/mainReducer';
import { Button } from '../ui';
import { LayoutVertical } from '../ui/layout';

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
      <LayoutVertical height="100vh">
        <AppHeader>
          <Flex1 />
          <Button
            onClick={this.props.logout}
          >
            Logout
          </Button>
        </AppHeader>
        { this.props.isLoading ? 'Loading... ' : this.getContent() }
      </LayoutVertical>
    );
  }
}

const AppContainer = styled('div', {
  display: 'flex',
  flex: 1,
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
  logout: () => dispatch(sessionActions.logoutRequest()),
});

const mapStateToProps = state => ({
  haveSession: getSessionUserId(state) != null,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
