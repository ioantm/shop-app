import { connect } from 'react-redux';
import Signin from './Signin';
import { login } from '../actions';
import { browserHistory } from 'react-router';

const mapDispatchToProps = (dispatch, { pendingPage }) => ({
  login: (credentials) => {
    dispatch(login(credentials))
      .then(() => {
        if (!pendingPage) {
          browserHistory.push('/lists');
        } else {
          browserHistory.push(pendingPage);
        }
      })
  },
});


export default connect(null, mapDispatchToProps)(Signin);
