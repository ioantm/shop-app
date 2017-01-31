// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import * as sessionActions from '../store/session/actions';
import {getSessionUserId} from '../store/mainReducer';
import {Button} from '../ui';
import {Flex1} from '../ui/layout';
import {LayoutVertical} from '../ui/layout';

type Props = {
  children: {},
  logout(): void,
  haveSession: boolean,
  isLoading: boolean
};

class App extends Component {
  props: Props;

  getContent() {
    return (
      <AppContainer>
        <h2>Shopping List App</h2>
        {this.props.children}
      </AppContainer>
    );
  }

  render() {
    return (
      <Container height="100vh">
        <AppHeader>
          <Flex1 />
          <Button onClick={this.props.logout}>
            Logout
          </Button>
        </AppHeader>
        {this.props.isLoading ? 'Loading... ' : this.getContent()}
      </Container>
    );
  }
}

const Container = styled(LayoutVertical)`
  height: 100vh;
`;

const AppContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const AppHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 10px;
`;

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(sessionActions.logoutRequest())
});

const mapStateToProps = state => ({
  haveSession: getSessionUserId(state) != null
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
