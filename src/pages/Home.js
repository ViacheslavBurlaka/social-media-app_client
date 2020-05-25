import React, {useEffect, useState} from 'react';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/Scream";

const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    axios.get('/screams')
      .then(res => setScreams(res.data))
      .catch(err => console.error(err))
  }, [])

  const screamElements = screams ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
  ) : <p>Loading...</p>

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {screamElements}
      </Grid>
      <Grid item sm={4} xs={12}>
        Profile
      </Grid>
    </Grid>
  );
};

export default Home;
