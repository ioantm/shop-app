import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout, getLists } from '../actions';
import { styled } from 'styletron-react';
import { getSessionUserId } from '../reducers';
import { Button } from '../ui';

class App extends Component {
  componentDidMount() {
    this.props.getLists();
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
        <AppContainer>
          <h2>Shopping List App</h2>
          {
            this.props.children
          }
        </AppContainer>
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

App.propTypes = {
  children: React.PropTypes.object,
  logout: React.PropTypes.func,
  getLists: React.PropTypes.func.isRequired,
  haveSession: React.PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  getLists: () => dispatch(getLists()),
  logout: () => dispatch(logout()),
});

const mapStateToProps = state => ({
  haveSession: getSessionUserId(state) != null,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
