import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function Home({ user, loggedIn = false }) {
  // const navigate = useNavigate();
  const loggedInUser = JSON.parse(user);
  // console.log(loggedInUser.id);
  const [sets, setSets] = useState([]);
   axios.get('http://localhost:5001/sets', { params: { userId: loggedInUser.id } }).then(res => {
    // console.log(res.data);
    setSets(res.data);
    // console.log(sets);   
  });

  // function returnNotSignedIn() {
  //   navigate('/signin');
  // }
  // function returnDefaultHome(user) {
  //   console.log('hi2')
  //   return <DefaultHome loggedInUser={user} />
  // }

  // useEffect(() => {
  //   if (!loggedIn) {
  //     returnNotSignedIn();
  //   }
  //   else {
  //     const loggedInUser = JSON.parse(user);
  //     returnDefaultHome(loggedInUser);
  //   }
  // }, []);

  return (
    <div>
        <Paper elevation={10} style={{ width: '50vw', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '25%', marginTop: '90px' }}>
            <Typography variant={'h1'} style={{ fontWeight: '300' }}>Hello, <span style={{ color: '#ff9800' }}>{ loggedInUser.name }</span></Typography>
        </Paper>
        <Paper elevation={18} style={{ width: '80vw', height: '400px', marginTop: '50px', marginLeft: '10%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <Typography variant={'h3'} style={{ marginTop: '50px' }}>Your Sets</Typography>
          <br></br>
          {sets.length > 0 ? (
            
            <Stack direction="row" spacing={3} style={{ marginTop: '50px' }} >
            { sets.map((set, i) => {
              return <Paper key={i} elevation={2} style={{ padding: '20px', fontSize: '20px', cursor: 'pointer' }} >{set.name}</Paper>
            })}
          </Stack>
          ) : (
            <Typography variant="body1">Loading sets...</Typography>
          )  }
        </Paper>
    </div>
  )
}
