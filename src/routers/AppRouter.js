import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from '../components/layout/Navbar';
import AuthRoute from '../components/hocs/AuthRoute';

// Pages
import Home from '../pages/home';
import User from '../pages/user';
import Signup from '../pages/signup';
import Login from '../pages/login';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <div className="Container">
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Route exact path="/users/:handle" component={User} />
          <Route exact path="/users/:handle/scream/:screamId" component={User} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
