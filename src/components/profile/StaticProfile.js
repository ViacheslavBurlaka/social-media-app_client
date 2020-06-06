import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import { Paper, Typography } from '@material-ui/core';

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
  ...theme.profileStyles
});

const StaticProfile = ({
  classes,
  profile: { handle, createdAt, imageUrl, bio, website, location }
}) => {
  return (
    <Paper className={classes.profile}>
      <div className={classes.profileImage}>
        <img src={imageUrl} alt="profile" />
      </div>
      <div className={classes.profileInformation}>
        <MuiLink
          component={Link}
          to={`/users/${handle}`}
          color="primary"
          align="center"
          variant="h5"
        >
          @{handle}
        </MuiLink>
        {bio && <Typography variant="body2">{bio}</Typography>}
        {location && (
          <Typography variant="body2">
            <LocationOn color="primary" />
            <span>{location}</span>
          </Typography>
        )}
        {website && (
          <Typography variant="body2">
            <LinkIcon color="primary" />
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </Typography>
        )}
        <Typography variant="body2">
          <CalendarToday color="primary" /> <i>Joined at {dayjs(createdAt).format('MMM YYYY')}</i>
        </Typography>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
