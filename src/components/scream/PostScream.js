import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { clearErrors, postScream } from '../../redux/actions/dataActions';

// Components
import { CustomButton } from '../layout/CustomButton';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  CircularProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  ...theme.formStyles,
  ...theme.dialogStyles
});

const PostScream = ({ classes, postScream, clearErrors, UI: { loading, errors } }) => {
  const initialState = {
    opened: false,
    body: '',
    errors: {}
  };

  const [state, setState] = useState(initialState);

  const handleOpen = () => {
    setState((prevState) => ({
      ...prevState,
      opened: true
    }));
  };

  const handleClose = useCallback(() => {
    clearErrors();
    setState((prevState) => ({
      ...prevState,
      opened: false,
      errors: {}
    }));
  }, [clearErrors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postScream({
      body: state.body
    });
  };

  useEffect(() => {
    if (errors) {
      setState((prevState) => ({
        ...prevState,
        errors: errors
      }));
    }

    if (!loading && Object.keys(errors).length === 0 && state.opened) {
      setState((prevState) => ({
        ...prevState,
        body: ''
      }));
      handleClose();
    }
    // eslint-disable-next-line
  }, [errors, loading, handleClose]);

  return (
    <>
      <CustomButton tip="Post a Scream" onClick={handleOpen}>
        <AddIcon />
      </CustomButton>
      <Dialog open={state.opened} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              name="body"
              type="text"
              label="Scream!!!"
              value={state.body}
              placeholder="Share what in your mind!"
              onChange={handleChange}
              multiline
              rows="3"
              fullWidth
              error={!!state.errors.body}
              helperText={state.errors.body}
            />
            <Button type="submit" variant="contained" disabled={loading} color="primary">
              Submit {loading && <CircularProgress />}
            </Button>
          </form>
        </DialogContent>
        <CustomButton tip="Close" onClick={handleClose} btnClassName={classes.closeBtn}>
          <CloseIcon />
        </CustomButton>
      </Dialog>
    </>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
