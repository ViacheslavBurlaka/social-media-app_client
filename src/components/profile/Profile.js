import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadUserImage } from '../../redux/actions/userActions';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditDetails from './EditDetails';
import { CustomButton } from '../../elements/CustomButton';

const styles = (theme) => ({
  ...theme.formStyles
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
      <Paper>
        <div>
          <div className="Profile__image">
            <img src={imageUrl} alt="profile" />
            <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
            <CustomButton tip="Edit profile image" onClick={handleEditImage}>
              <EditIcon color="secondary" />
            </CustomButton>
          </div>
          <hr />
          <div className="Profile__details">
            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
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
          <CustomButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn />
          </CustomButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper>
        <Typography variant="body2">No profile found, please login again</Typography>
        <div>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Login
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
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
