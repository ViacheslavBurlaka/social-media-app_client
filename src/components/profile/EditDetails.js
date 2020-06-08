import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

// Components
import { CustomButton } from '../layout/CustomButton';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditTwoTone';

const styles = (theme) => ({
  ...theme.formStyles
});

const EditDetails = ({ classes, credentials, editUserDetails }) => {
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
      <CustomButton tip="Edit details" onClick={handleOpen}>
        <EditIcon color="primary" />
      </CustomButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle align={'center'}>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              className={classes.textField}
              name="bio"
              type="text"
              label="Bio"
              multiline
              variant="outlined"
              placeholder="A short bio about yourself"
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              name="website"
              type="text"
              label="Website"
              multiline
              variant="outlined"
              placeholder="Your personal website"
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              name="location"
              type="text"
              label="Location"
              multiline
              variant="outlined"
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
          <Button onClick={handleSubmit} color={'primary'}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
