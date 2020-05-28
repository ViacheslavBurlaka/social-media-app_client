import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { CustomButton } from '../elements/CustomButton';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

const Navbar = ({ authenticated }) => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar className="Navbar__container">
          {authenticated ? (
            <>
              <CustomButton tip="Post a Scream">
                <AddIcon />
              </CustomButton>
              <Link to="/">
                <CustomButton tip="Home">
                  <HomeIcon />
                </CustomButton>
              </Link>
              <CustomButton tip="Notifications">
                <Notifications />
              </CustomButton>
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
