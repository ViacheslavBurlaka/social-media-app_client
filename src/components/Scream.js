import React from 'react';
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: 'flex',
    marginBottom: 16,
  },
  content: {
    padding: 24
  }
}

const Scream = (props) => {
  dayjs.extend(relativeTime);
  const {
    classes,
    scream: {
      userHandle,
      body,
      createdAt
    }
  } = props;

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
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Scream);
