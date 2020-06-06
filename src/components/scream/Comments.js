import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI staff
import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography } from '@material-ui/core';

const styles = {
  comment: {
    padding: '0.5rem 0',
    borderBottom: '1px dashed #ccc',
    '&:last-of-type': {
      borderBottom: 0
    }
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
    marginLeft: '0.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  commentBody: {
    width: '100%'
  },
  commentTime: {
    paddingLeft: '0.5rem'
  }
};

const Comments = ({ classes, comments }) => {
  return (
    <Grid container>
      {comments &&
        comments.map((comment) => {
          const { body, userHandle, userImage, createdAt } = comment;
          return (
            <Grid container key={createdAt} className={classes.comment}>
              <Grid item sm={2}>
                <img src={userImage} alt="comment" className={classes.commentImage} />
              </Grid>
              <Grid item sm={10}>
                <div className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className={classes.commentTime}>
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <Typography variant="body1" className={classes.commentBody}>
                    {body}
                  </Typography>
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
