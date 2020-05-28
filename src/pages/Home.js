import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    let isCanceled = false;
    axios
      .get('/screams')
      .then((res) => {
        if (!isCanceled) setScreams(res.data);
      })
      .catch((err) => console.error(err));

    return () => {
      isCanceled = true;
    };
  }, []);

  const screamElements = screams ? (
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

export default Home;
