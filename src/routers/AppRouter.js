import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Components
import Navbar from "../components/Navbar";

// Pages
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <Router>
      <Navbar/>
      <div className="Container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
