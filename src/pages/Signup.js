import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginIcon from '../assets/images/login.png';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  ...theme.formStyles,
});

const Signup = ({ classes }) => {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    errors: {},
  };

  const [state, setState] = useState(initialState);

  const [loading, setLoading] = useState(false);

  const [isLogined, setIsLogined] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      handle: state.handle,
    };

    axios
      .post('/signup', newUserData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        setLoading(false);
        setIsLogined(true);
      })
      .catch((err) => {
        console.error(err.response.data);
        setState((prevState) => ({
          ...prevState,
          errors: err.response.data,
        }));
        setLoading(false);
      });
  }

  // Redirect to home page after successful login
  if (isLogined) {
    return <Redirect to="/" />;
  }

  const { errors } = state;

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
            <CircularProgress color="secondary" />
          ) : (
            <Button type="submit" variant="contained" className={classes.button}>
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
};

export default withStyles(styles)(Signup);
