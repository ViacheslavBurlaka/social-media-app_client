import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginIcon from '../assets/images/login.png';
import { Link } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import { logoutUser, signupUser } from '../redux/actions/userActions';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
  ...theme.formStyles
});

const Signup = ({ classes, history, UI: { loading, errors }, signupUser }) => {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    errors: {}
  };

  const [state, setState] = useState(initialState);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle submit
  function handleSubmit(event) {
    event.preventDefault();

    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      handle: state.handle
    };

    signupUser(newUserData, history);
  }

  return (
    <Grid container className={classes.form} justify="center">
      <Grid item sm={4}>
        <img src={LoginIcon} alt="login" className={classes.icon} />
        <Typography variant="h3" className={classes.pageTitle}>
          Sign up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="handle"
            name="handle"
            label="Handle"
            type="handle"
            className={classes.textField}
            value={state.handle}
            onChange={handleChange}
            fullWidth
            helperText={errors.handle}
            error={!!errors.handle}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            className={classes.textField}
            value={state.email}
            onChange={handleChange}
            fullWidth
            helperText={errors.email}
            error={!!errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            className={classes.textField}
            value={state.password}
            onChange={handleChange}
            fullWidth
            helperText={errors.password}
            error={!!errors.password}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            type="password"
            className={classes.textField}
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
          />

          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}

          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Sign up
            </Button>
          )}
          <br />
          <small>
            If you already have an account please login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser, logoutUser })(withStyles(styles)(Signup));
