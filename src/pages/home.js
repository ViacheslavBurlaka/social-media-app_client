import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import Pagination from '../components/layout/Pagination';

// Redux stuff
import { connect } from 'react-redux';
import { getAllScreams } from '../redux/actions/dataActions';

// MUI stuff
import { Grid } from '@material-ui/core';
import ScreamSceleton from '../components/sceletons/ScreamSceleton';

const Home = ({ screams, getAllScreams, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [screamsPerPage] = useState(3);

  // Get current posts
  const indexOfLastScream = currentPage * screamsPerPage;
  const indexOfFirstScream = indexOfLastScream - screamsPerPage;
  const currentScreams = screams.slice(indexOfFirstScream, indexOfLastScream);

  // Change page
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getAllScreams();
  }, [getAllScreams]);

  const screamElements = !loading
    ? currentScreams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    : Array.from({ length: 3 }).map((item, index) => <ScreamSceleton key={index} />);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamElements}
        <Pagination
          pageLimit={screamsPerPage}
          totalRecords={screams.length}
          paginate={handlePaginate}
        />
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
