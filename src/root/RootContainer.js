// @flow
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import routes from '../routes';
import { getSessionUserId } from '../reducers';
import Root from './Root';
import { getLists } from '../actions';

class RootContainer extends Component {
  componentDidMount() {
    this.props.getLists()
      .then(() => browserHistory.push('/lists'))
      .catch((err) => {
        if (err.status === 401) {
          browserHistory.push('/signin');
        }
      });
  }

  render() {
    const {store, history, isAuthenticated } = this.props;

    console.log('isAuthenticated', isAuthenticated);
    return (
        <Root>
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>
        </Root>
    );
  }
}

RootContainer.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
  isAuthenticated: React.PropTypes.string,
  getLists: React.PropTypes.func,
}

const mapStateToProps = (state) => ({
  isAuthenticated: getSessionUserId(state)
});

const mapDispatchToProps = dispatch => ({
  getLists: () => dispatch(getLists()),
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(RootContainer);
