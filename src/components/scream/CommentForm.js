import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

// MUI stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const CommentForm = ({ screamId, authenticated, UI: { errors, loading }, submitComment }) => {
  const initialState = {
    body: '',
    errors: {}
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (errors) {
      setState((prevState) => ({
        ...prevState,
        errors: errors
      }));
    }

    if (!loading && Object.keys(errors).length === 0) {
      setState((prevState) => ({
        ...prevState,
        body: ''
      }));
    }
  }, [errors, loading]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitComment(screamId, { body: state.body });
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          value={state.body}
          error={!!state.errors.comment}
          helperText={state.errors.comment}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Grid>
  ) : null;

  return <>{commentFormMarkup}</>;
};

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
