// @flow
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import { Provider, connect } from 'react-redux';
import { getSessionUserId } from '../reducers';
import Root from './Root';

class RootContainer extends Component {
    constructor(props) {
        super(props);

        if (!this.props.isAuthenticated) {
            browserHistory.push('/signin')
        }
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
    isAuthenticated: React.PropTypes.string
}

export default connect((state) => {
    return {
        isAuthenticated: getSessionUserId(state)
    }
})(RootContainer);