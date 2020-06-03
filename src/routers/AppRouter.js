import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from '../components/layout/Navbar';
import AuthRoute from '../hocs/AuthRoute';

// Pages
import Home from '../pages/Home';
import User from '../pages/User';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <div className="Container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/:handle" component={User} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
