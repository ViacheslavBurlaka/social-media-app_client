import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
