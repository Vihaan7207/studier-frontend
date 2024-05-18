import React from 'react';
import { Paper, Typography, TextField, Stack, Button, Link } from '@mui/material';
import { useState } from 'react';

export default function Signin(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [usernameWrong, setUsernameWrong] = useState(false);
  // const [passwordWrong, setPasswordWrong] = useState(false);
  // const [usernameError, setUsernameError] = useState('');
  // const [passwordError, setPasswordError] = useState('');

  const login = () => {
        if (username !== "" && password !== "") {
          props.logIn(username, password);
        }
        else {
          alert('username and password must not be empty')
        }
  }

  return (
    <>
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center       ' }}>
        <Paper elevation={6} style={{ width: '50vw', height: '500px', fontFamily: 'Lexend', display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: "flex", alignItems: "center",  flexDirection: "column", width: "50vw"}}>
                <Typography variant="h3" style={{ marginTop: '60px'}}>Sign In</Typography>
                  <Stack spacing={5} justifyContent="center" style={{ marginTop: "50px" }}>
                    <TextField value={username} onChange={e => setUsername(e.target.value)} label="Username" variant="filled" style={{ width: "400px"}} />
                    <TextField type="password" value={password} onChange={e => setPassword(e.target.value)} id="username" label="Password" variant="filled" style={{ width: "400px" }} />
                    <Button variant="contained" onClick={login}>Log In</Button>
                    <p style={{ marginLeft: "15%" }}>Don't have an account? <Link href='/signup' underline="none" >Sign Up</Link></p>
                  </Stack>
                </div>
        </Paper>
    </div>
    </>
  )
}
