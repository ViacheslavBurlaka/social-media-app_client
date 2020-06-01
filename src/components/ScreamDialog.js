import React, { useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import { clearErrors, getScream } from '../redux/actions/dataActions';

// Components
import { CustomButton } from '../elements/CustomButton';

// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';

const ScreamDialog = ({
  getScream,
  screamId,
  userHandle,
  scream: { body, createdAt, likeCount, commentCount },
  UI: { loading }
}) => {
  const initialState = {
    opened: false
  };

  const [state, setState] = useState(initialState);

  const handleOpen = () => {
    setState((prevState) => ({
      ...prevState,
      opened: true
    }));
    getScream(screamId);
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      opened: false
    }));
  };

  const dialogMarkup = loading ? (
    <CircularProgress />
  ) : (
    <Grid container>
      <Grid item>
        <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
          @{userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <CustomButton tip="comments">
          <ChatIcon />
        </CustomButton>
        <span>{commentCount} comments</span>
      </Grid>
    </Grid>
  );

  return (
    <>
      <CustomButton tip="Expand scream" onClick={handleOpen}>
        <UnfoldMore />
      </CustomButton>
      <Dialog open={state.opened} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Scream details{' '}
          <CustomButton tip="Close" onClick={handleClose}>
            <CloseIcon />
          </CustomButton>
        </DialogTitle>
        <DialogContent>{dialogMarkup}</DialogContent>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  scream: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream
});

export default connect(mapStateToProps, { getScream, clearErrors })(ScreamDialog);
