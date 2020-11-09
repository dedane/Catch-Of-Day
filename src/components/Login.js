import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
        <nav className="login">
            <p>Sign in to manage your Store's inventory</p>
            <button className="github" onClick={() => props.authenticate("Github")}>
                 Log in with Github</button>
             <button className="facebook" onClick={() => props.authenticate("Facebook")}>
                 Log in with Facebook</button>
        </nav>
)

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login
