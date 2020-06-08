import React from 'react';
import NoImg from '../../assets/images/no-img.png';
import PropTypes from 'prop-types';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardMedia, CardContent } from '@material-ui/core';

const styles = (theme) => ({
  ...theme.screamStyles,
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0, 0.2)',
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    marginBottom: 10
  }
});

const ScreamSceleton = ({ classes }) => {
  return (
    <>
      <Card className={classes.card}>
        <CardMedia image={NoImg} className={classes.image} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div className={classes.handle} />
            <div className={classes.date} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.halfLine} />
          </CardContent>
        </div>
      </Card>
    </>
  );
};

ScreamSceleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSceleton);
