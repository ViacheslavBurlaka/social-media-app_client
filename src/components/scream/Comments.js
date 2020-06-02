import React from 'react';
import PropTypes from 'prop-types';

// MUI staff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const styles = {
  comment: {
    padding: '0 1rem',
    display: 'flex',
    width: '100%',
    marginBottom: 16
  },
  commentImage: {
    display: 'block',
    margin: '0 auto',
    height: '50px',
    width: '50px',
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  }
};

const Comments = ({ classes, comments }) => {
  return (
    <Grid container>
      {comments &&
        comments.map((comment) => {
          const { body, userHandle, userImage, createdAt } = comment;
          return (
            <Grid item key={createdAt} className={classes.comment}>
              <Grid item sm={2}>
                <img src={userImage} alt="comment" className={classes.commentImage} />
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <Typography variabnt="body1">{body}</Typography>
                </div>
              </Grid>
            </Grid>
          );
        })}
    </Grid>
  );
};

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array
};

export default withStyles(styles)(Comments);
