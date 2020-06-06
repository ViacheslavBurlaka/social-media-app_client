import React from 'react';
import PropTypes from 'prop-types';
import NoImg from '../../assets/images/no-img.png';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

const styles = (theme) => ({
  ...theme.profileStyles,
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
  },
  sceletonBtn: {
    borderRadius: '50%',
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0,0,0, 0.3)'
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    margin: '0 auto 10px'
  }
});

const ProfileSkeleton = ({ classes }) => {
  return (
    <Paper className={classes.profile}>
      <div className={classes.profileImage}>
        <img src={NoImg} alt="profile" />
      </div>
      <div className={classes.profileInformation}>
        <div className={classes.handle} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </div>
      <div className={classes.profileActions}>
        <div className={classes.sceletonBtn} />
        <div className={classes.sceletonBtn} />
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
