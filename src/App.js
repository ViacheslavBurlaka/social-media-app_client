import React from 'react';
import './App.scss';
import Navbar from "./components/Navbar";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
