import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import Navbar from '../components/Navbar';
import AuthRoute from '../hocs/AuthRoute';

// Pages
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const AppRouter = ({ authenticated }) => {
  return (
    <Router>
      <Navbar />
      <div className="Container">
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
          <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
        </Switch>
      </div>
    </Router>
  );
};

AppRouter.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default AppRouter;
