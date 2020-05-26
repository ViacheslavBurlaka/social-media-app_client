import React from 'react';
import { NavLink } from 'react-router-dom';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

const Navbar = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar className="Navbar__container">
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={NavLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={NavLink} to="/signup">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
