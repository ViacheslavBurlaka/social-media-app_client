import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// MUI staff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Comments = ({ comments }) => {
  const commentsMarkup =
    comments.length > 0
      ? comments.map((comment) => {
          const { screamId: id, body, createdAt, userHandle } = comment;
          return (
            <Grid key={id}>
              <Typography>{body}</Typography>
              <Typography>{userHandle}</Typography>
              {/*<Typography>{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>*/}
            </Grid>
          );
        })
      : null;

  return <Grid container>{commentsMarkup}</Grid>;
};

Comments.propTypes = {
  comments: PropTypes.array
};

export default Comments;
