import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

// Components
import { CustomButton } from '../elements/CustomButton';

// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const PostScream = ({ postScream, UI: { loading, errors } }) => {
  const initialState = {
    opened: false,
    body: '',
    errors: {}
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      errors: errors
    }));
  }, [errors]);

  const handleOpen = () => {
    setState((prevState) => ({
      ...prevState,
      opened: true
    }));
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      opened: false,
      errors: {}
    }));
  };

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

  return (
    <>
      <CustomButton tip="Post a Scream" onClick={handleOpen}>
        <AddIcon />
      </CustomButton>
      <Dialog open={state.opened} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Post a new scream{' '}
          <CustomButton tip="Close" onClick={handleClose}>
            <CloseIcon />
          </CustomButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Scream!!!"
              placeholder="Share what in your mind!"
              onChange={handleChange}
              multiline
              rows="3"
              fullWidth
              error={!!state.errors.body}
              helperText={state.errors.body}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              Submit {loading && <CircularProgress />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postScream })(PostScream);
