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

const styles = {
  form: {
    textAlign: 'center',
  },
  textField: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  icon: {
    marginBottom: 16,
  },
  pageTitle: {
    marginBottom: 16,
  },
  customError: {
    color: 'red',
    fontSize: '0.75rem',
    marginBottom: 16,
  },
};

const Login = ({ classes }) => {
  const initialState = {
    email: '',
    password: '',
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

    const userData = {
      email: state.email,
      password: state.password,
    };

    axios
      .post('/login', userData)
      .then((res) => {
        console.log(res.data);
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
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
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
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}

          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button type="submit" variant="contained" className={classes.button}>
              Login
            </Button>
          )}
          <br />
          <small>
            No account yet? Sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
