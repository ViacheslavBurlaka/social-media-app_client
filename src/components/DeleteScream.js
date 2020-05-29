import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from '../elements/CustomButton';

// Redux stuff
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteScream = ({ screamId, deleteScream }) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const handleDeleteScream = () => {
    deleteScream(screamId);
    setOpened(false);
  };

  return (
    <>
      <CustomButton tip="Delete scream" onClick={handleOpen}>
        <DeleteOutline />
      </CustomButton>
      <Dialog open={opened} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you certain you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteScream}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(null, { deleteScream })(DeleteScream);
