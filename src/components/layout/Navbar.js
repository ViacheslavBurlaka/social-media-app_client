import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import PostScream from '../scream/PostScream';
import Notifications from './Notifications';
import { CustomButton } from './CustomButton';

// Redux stuff
import { connect } from 'react-redux';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import { Toolbar, AppBar, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const styles = (theme) => ({
  ...theme.navbar
});

const Navbar = ({ classes, authenticated }) => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.container}>
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
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
