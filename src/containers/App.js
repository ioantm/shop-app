// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from 'styletron-react';

import * as sessionActions from '../store/session/actions';
import { getSessionUserId } from '../store/mainReducer';
import { LayoutVertical, Nav, NavRight, NavItem, Icon, Button, Icons } from '../ui';

type Props = {
  children: {},
  logout(): void,
  isLoading: boolean
};

class App extends Component {
  props: Props;

  getContent() {
    return (
      <AppContainer>
        <Wrapper>
          <Nav>
            <NavRight>
              <NavItem>
                <Button>
                  <Icon size="24" color="#7a7a7a" icon={Icons.MENU} />
                </Button>
              </NavItem>
            </NavRight>
          </Nav>
          {this.props.children}
        </Wrapper>
      </AppContainer>
    );
  }

  render() {
    return (
      <Container height="100vh">
        {this.props.isLoading ? 'Loading... ' : this.getContent()}
      </Container>
    );
  }
}

const Container = styled(LayoutVertical, {
  height: '100vh',
  backgroundColor: '#4BA7E6'
});

const AppContainer = styled('div', {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  alignItems: 'center'
});

const Wrapper = styled('div', {
  maxWidth: '800px',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

// const AppHeader = styled('div', {
//   display: 'flex',
//   flexDirection: 'row',
//   paddingRight: '10px'
// });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(sessionActions.logoutRequest())
});

const mapStateToProps = state => ({
  haveSession: getSessionUserId(state) != null
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
