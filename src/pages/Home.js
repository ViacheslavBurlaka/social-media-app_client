import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { getAllScreams } from '../redux/actions/dataActions';

const Home = ({ screams, getAllScreams, loading }) => {
  useEffect(() => {
    getAllScreams();
  }, [getAllScreams]);

  const screamElements = !loading ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {screamElements}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  screams: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAllScreams: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  screams: state.data.screams,
  loading: state.data.loading
});

export default connect(mapStateToProps, { getAllScreams })(Home);
