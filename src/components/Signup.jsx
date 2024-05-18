import React from 'react';
import { Paper, Typography, TextField, Stack, Button, Link } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export default function Signup() {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function createUser() {
    axios.post('http://localhost:5001/users', {}, {
      params: {
        name: name,
        username: username,
        password: password
      }
    })
    .then(res => {

      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <>
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center       ' }}>
        <Paper elevation={6} style={{ width: '50vw', height: '500px', fontFamily: 'Lexend', display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: "flex", alignItems: "center",  flexDirection: "column", width: "50vw"}}>
                <Typography variant="h3" style={{ marginTop: '60px'}}>Sign Up</Typography>
                  <Stack spacing={3} justifyContent="center" style={{ marginTop: "50px" }}>
                    <TextField value={name} onChange={e => setName(e.target.value)} label="Name" variant="filled" style={{ width: "400px"}} />
                    <TextField value={username} onChange={e => setUsername(e.target.value)} label="Username" variant="filled" style={{ width: "400px"}} />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} label="Password" variant="filled" style={{ width: "400px" }} />
                    <Button variant="contained" onClick={createUser}>Sign Up</Button>
                    <p style={{ marginLeft: "15%" }}>Already have an account? <Link href='/signin' underline="none" >Sign in</Link></p>
                  </Stack>
                </div>
        </Paper>
    </div>
    </>
  )
}
