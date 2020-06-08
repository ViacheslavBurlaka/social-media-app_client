import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Components
import UnauthorizedProfile from './UnauthorizedProfile';
import EditDetails from './EditDetails';
import ProfileSkeleton from '../sceletons/ProfileSceleton';
import { CustomButton } from '../layout/CustomButton';

// Redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadUserImage } from '../../redux/actions/userActions';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarTodayTwoTone';
import UploadIcon from '@material-ui/icons/PhotoCameraTwoTone';
import ExitIcon from '@material-ui/icons/ExitToApp';

const styles = (theme) => ({
  ...theme.profileStyles
});

const Profile = ({
  classes,
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated
  },
  uploadUserImage,
  logoutUser
}) => {
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadUserImage(formData);
  };

  const handleEditImage = () => {
    const imageInput = document.getElementById('imageInput');
    imageInput.click();
  };

  function handleLogout() {
    logoutUser();
  }

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.profile}>
        <div className={classes.profileImage}>
          <img src={imageUrl} alt="profile" />
          <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
          <CustomButton tip="Edit profile image" onClick={handleEditImage}>
            <UploadIcon color="primary" />
          </CustomButton>
        </div>
        <div className={classes.profileInformation}>
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            align={'center'}
            variant="h5"
          >
            @{handle}
          </MuiLink>
          {bio && <Typography variant="body2">{bio}</Typography>}
          {location && (
            <Typography variant={'body2'}>
              <LocationOn color="primary" />
              <span>{location}</span>
            </Typography>
          )}
          {website && (
            <Typography variant={'body2'}>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}
                {website}
              </a>
            </Typography>
          )}
          <Typography variant={'body2'}>
            <CalendarToday color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </Typography>
        </div>
        <div className={classes.profileActions}>
          <CustomButton tip="Logout" onClick={handleLogout}>
            <ExitIcon color="primary" />
          </CustomButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <UnauthorizedProfile />
    )
  ) : (
    <ProfileSkeleton />
  );

  return profileMarkup;
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadUserImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { uploadUserImage, logoutUser })(
  withStyles(styles)(Profile)
);
