import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Button, Paper } from '@material-ui/core';

const styles = () => ({
  unauthorizedForm: {
    padding: '1rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    '& > a': {
      width: '100%',
      margin: '0 1rem'
    }
  }
});

const UnauthorizedProfile = ({ classes }) => {
  return (
    <Paper className={classes.unauthorizedForm}>
      <Typography variant="h6" align="center" paragraph={true}>
        No profile found, please login again
      </Typography>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" component={Link} to="/login">
          Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/signup">
          Signup
        </Button>
      </div>
    </Paper>
  );
};

UnauthorizedProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UnauthorizedProfile);
