import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

// Components
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import ProfileSceleton from '../components/sceletons/ProfileSceleton';
import ScreamSceleton from '../components/sceletons/ScreamSceleton';

// MUI stuff
import { Grid } from '@material-ui/core';

const User = ({ data: { loading, screams }, getUserData, match }) => {
  const initialState = {
    profile: null,
    screamIdParam: null
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const handle = match.params.handle;
    const screamId = match.params.screamId;

    if (screamId) {
      setState((prevState) => ({
        ...prevState,
        screamIdParam: screamId
      }));
    }

    // Get only user's posts and dispatch them to store
    getUserData(handle);

    // Make another get-request, because I don't want to save static profile data at global state
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          profile: res.data.user
        }));
      })
      .catch((err) => console.error(err));
  }, [match, getUserData]);

  const screamMarkup = loading ? (
    Array.from({ length: 2 }).map((item, index) => <ScreamSceleton key={index} />)
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !state.screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== state.screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />;
      } else {
        return <Scream key={scream.screamId} scream={scream} openDialog />;
      }
    })
  );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {screamMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {state.profile === null ? <ProfileSceleton /> : <StaticProfile profile={state.profile} />}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
