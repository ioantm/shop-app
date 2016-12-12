import React from 'react';
import { connect } from 'react-redux';
import Signin from './Signin';
import * as actions from '../actions';


export default connect(null, actions)(Signin);