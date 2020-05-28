import React from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from '../elements/CustomButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FavoriteBorder } from '@material-ui/icons';

const styles = {
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
  scream: { userHandle, body, createdAt, likeCount, commentCount, screamId },
  user: { authenticated, likes },
  likeScream,
  unlikeScream
}) => {
  const likedScream = () => {
    return !!(likes && likes.find((like) => like.screamId === screamId));
  };

  const handleLikeScream = () => {
    likeScream(screamId);
  };

  const handleUnLikeScream = () => {
    unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <CustomButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </CustomButton>
  ) : likedScream() ? (
    <CustomButton tip="Undo like" onClick={handleUnLikeScream}>
      <FavoriteIcon color="secondary" />
    </CustomButton>
  ) : (
    <CustomButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </CustomButton>
  );

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="secondary">
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} likes</span>
        <CustomButton tip="comments">
          <ChatIcon />
        </CustomButton>
        <span>{commentCount} comments</span>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(withStyles(styles)(Scream));
