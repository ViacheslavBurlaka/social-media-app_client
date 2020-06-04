import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import PostScream from '../scream/PostScream';
import Notifications from './Notifications';
import { CustomButton } from './CustomButton';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

const Navbar = ({ authenticated }) => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar className="Navbar__container">
          {authenticated ? (
            <>
              <PostScream />
              <Link to="/">
                <CustomButton tip="Home">
                  <HomeIcon />
                </CustomButton>
              </Link>
              <Notifications />
            </>
          ) : (
            <>
              <Button color="inherit" component={NavLink} to="/">
                Home
              </Button>
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={NavLink} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
