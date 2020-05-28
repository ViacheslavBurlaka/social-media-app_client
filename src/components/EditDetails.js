import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

const EditDetails = ({ credentials, editUserDetails }) => {
  const initialState = {
    bio: '',
    website: '',
    location: '',
    open: false
  };

  const [state, setState] = useState(initialState);

  const handleOpen = () => {
    setState((prevState) => ({
      ...prevState,
      open: true
    }));
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      open: false
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location
    };

    editUserDetails(userDetails);
  };

  const mapUserDetailsToState = (credentials) => {
    setState((prevState) => ({
      ...prevState,
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    }));
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              multiline
              rows="3"
              placeholder="Your personal website"
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              multiline
              rows="3"
              placeholder="Where you live"
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={'secondary'}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
