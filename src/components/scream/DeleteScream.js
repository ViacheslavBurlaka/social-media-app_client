import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import { CustomButton } from '../layout/CustomButton';

// Redux stuff
import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const styles = {
  deleteBtn: {
    position: 'absolute',
    right: '1rem',
    top: '0.5rem'
  }
};

const DeleteScream = ({ classes, screamId, deleteScream }) => {
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
      <CustomButton tip="Delete scream" onClick={handleOpen} btnClassName={classes.deleteBtn}>
        <DeleteOutline color="secondary" />
      </CustomButton>
      <Dialog open={opened} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you certain you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color={'secondary'}>
            Cancel
          </Button>
          <Button onClick={handleDeleteScream} color={'primary'}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));
