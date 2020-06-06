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
import withStyles from '@material-ui/core/styles/withStyles';
import { Dialog, DialogContent, Typography, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

const styles = (theme) => ({
  ...theme.formStyles,
  ...theme.dialogStyles,
  expandBtn: {
    marginRight: '1rem',
    marginLeft: 'auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  headerTime: {
    paddingTop: '6px',
    marginLeft: '0.5rem'
  }
});

const ScreamDialog = ({
  classes,
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
    <>
      <div className={classes.header}>
        <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
          @{userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.headerTime}>
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
      </div>
      <Typography variant="body1">
        <em>{body}</em>
      </Typography>
      <LikeButton screamId={screamId} />
      <span>{likeCount} likes</span>
      <CustomButton tip="comments">
        <ChatIcon />
      </CustomButton>
      <span>{commentCount} comments</span>
      <Comments comments={comments} />
      <CommentForm screamId={screamId} />
    </>
  );

  return (
    <>
      <CustomButton tip="Expand scream" onClick={handleOpen} btnClassName={classes.expandBtn}>
        <UnfoldMore color={'primary'} />
      </CustomButton>
      <Dialog open={state.opened} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>{dialogMarkup}</DialogContent>
        <CustomButton tip="Close" onClick={handleClose} btnClassName={classes.closeBtn}>
          <CloseIcon />
        </CustomButton>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, { getScream, clearErrors })(
  withStyles(styles)(ScreamDialog)
);
