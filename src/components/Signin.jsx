import React from 'react';
import { Paper, Typography, TextField, Stack, Button, Link } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [usernameWrong, setUsernameWrong] = useState(false);
  // const [passwordWrong, setPasswordWrong] = useState(false);
  // const [usernameError, setUsernameError] = useState('');
  // const [passwordError, setPasswordError] = useState('');

  const login = () => {
    axios.get('http://localhost:5001/users')
    .then(res => {
        if (username !== "" && password !== "") {
          const logInUser = res.data.filter((user) => user.username === username)[0];
          if (logInUser.password === password) {
            navigate('/home');
          }
        }
        else {
          alert('username and password must not be empty')
        }
        
    })
    .catch(error => {
      throw error
    });
  }

  return (
    <>
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center       ' }}>
        <Paper elevation={6} style={{ width: '50vw', height: '500px', fontFamily: 'Lexend', display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: "flex", alignItems: "center",  flexDirection: "column", width: "50vw"}}>
                <Typography variant="h3" style={{ marginTop: '60px'}}>Sign In</Typography>
                  <Stack spacing={5} justifyContent="center" style={{ marginTop: "50px" }}>
                    <TextField value={username} onChange={e => setUsername(e.target.value)} label="Username" variant="filled" style={{ width: "400px"}} />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} id="username" label="Password" variant="filled" style={{ width: "400px" }} />
                    <Button variant="contained" onClick={login}>Log In</Button>
                    <p style={{ marginLeft: "15%" }}>Don't have an account? <Link href='/signup' underline="none" >Sign Up</Link></p>
                  </Stack>
                </div>
        </Paper>
    </div>
    </>
  )
}
