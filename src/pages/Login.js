import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginIcon from '../assets/images/login.png';
import { Link } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  ...theme.formStyles
});

const Login = ({ classes, loginUser, history, UI: { loading, errors } }) => {
  const initialState = {
    email: '',
    password: '',
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

    const userData = {
      email: state.email,
      password: state.password
    };

    loginUser(userData, history);
  }

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
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));
