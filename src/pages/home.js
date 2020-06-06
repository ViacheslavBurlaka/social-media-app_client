import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';

// Redux stuff
import { connect } from 'react-redux';
import { getAllScreams } from '../redux/actions/dataActions';

// MUI stuff
import { Grid } from '@material-ui/core';
import ScreamSceleton from '../components/sceletons/ScreamSceleton';

const Home = ({ screams, getAllScreams, loading }) => {
  useEffect(() => {
    getAllScreams();
  }, [getAllScreams]);

  const screamElements = !loading
    ? screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    : Array.from({ length: 5 }).map((item, index) => <ScreamSceleton key={index} />);

  return (
    <Grid container spacing={2}>
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
