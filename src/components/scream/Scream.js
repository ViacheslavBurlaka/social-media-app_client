import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Components
import { CustomButton } from '../../elements/CustomButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

// Redux stuff
import { connect } from 'react-redux';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  image: {
    width: 200
  },
  card: {
    display: 'flex',
    marginBottom: 16
  },
  content: {
    padding: 24
  }
};

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
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="secondary">
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <CustomButton tip="comments">
          <ChatIcon />
        </CustomButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog} />
      </CardContent>
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
