import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Components
import { CustomButton } from '../layout/CustomButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

// Redux stuff
import { connect } from 'react-redux';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

const styles = (theme) => ({
  ...theme.screamStyles,
  image: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    margin: '1rem 1.5rem 0',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      height: 120,
      margin: 'auto 1rem'
    }
  }
});

dayjs.extend(relativeTime);

const Scream = ({
  classes,
  scream: { userImage, userHandle, body, createdAt, likeCount, commentCount, screamId },
  user: {
    authenticated,
    credentials: { handle }
  },
  openDialog
}) => {
  const deleteButton =
    authenticated && userHandle === handle ? <DeleteScream screamId={screamId} /> : null;

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title="Profile image" className={classes.image} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color={'primary'}>
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
        <div className={classes.actions}>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <CustomButton tip="comments">
            <ChatIcon color={'primary'} />
          </CustomButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog} />
        </div>
      </div>
      {deleteButton}
    </Card>
  );
};

Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
