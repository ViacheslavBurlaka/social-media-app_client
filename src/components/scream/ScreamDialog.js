import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import { clearErrors, getScream } from '../../redux/actions/dataActions';

// Components
import { CustomButton } from '../layout/CustomButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';

// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

const ScreamDialog = ({
  openDialog,
  getScream,
  clearErrors,
  screamId,
  userHandle,
  scream: { body, createdAt, likeCount, commentCount, comments },
  UI: { loading }
}) => {
  const initialState = {
    opened: false,
    oldPath: '',
    newPath: ''
  };

  const [state, setState] = useState(initialState);

  const handleOpen = useCallback(() => {
    // when dialog opens it creates new url at browser like in twitter
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) {
      oldPath = `/users/${userHandle}`;
    }

    window.history.pushState(null, null, newPath);

    setState((prevState) => ({
      ...prevState,
      opened: true,
      oldPath,
      newPath
    }));
    getScream(screamId);
  }, [getScream, screamId, userHandle]);

  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath);
    clearErrors();
    setState((prevState) => ({
      ...prevState,
      opened: false
    }));
  };

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [openDialog, handleOpen]);

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
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <CustomButton tip="comments">
          <ChatIcon />
        </CustomButton>
        <span>{commentCount} comments</span>
      </Grid>
      <Comments comments={comments} />
      <CommentForm screamId={screamId} />
    </Grid>
  );

  return (
    <>
      <CustomButton tip="Expand scream" onClick={handleOpen}>
        <UnfoldMore />
      </CustomButton>
      <Dialog open={state.opened} onClose={handleClose} fullWidth maxWidth="sm">
        <CustomButton tip="Close" onClick={handleClose}>
          <CloseIcon />
        </CustomButton>
        <DialogContent>{dialogMarkup}</DialogContent>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  scream: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  scream: state.data.scream
});

export default connect(mapStateToProps, { getScream, clearErrors })(ScreamDialog);
