import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI stuff
// import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const StaticProfile = ({ profile: { handle, createdAt, imageUrl, bio, website, location } }) => {
  return (
    <Paper>
      <div>
        <div className="Profile__image">
          <img src={imageUrl} alt="profile" />
        </div>
        <div className="Profile__details">
          <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
          </MuiLink>
          {bio && <Typography variant="body2">{bio}</Typography>}
          {location && (
            <>
              <LocationOn color="primary" />
              <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default StaticProfile;
