import React from 'react';
import { connect } from 'react-redux';
import Signin from './Signin';

const SigninContainer = () => {
    return (
        <Signin></Signin>
    )
};

export default connect(null)(SigninContainer);