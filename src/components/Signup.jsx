import React from 'react';
import { Paper, Typography, TextField, Stack, Button, Link } from '@mui/material';

export default function Signup() {
  return (
    <>
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center       ' }}>
        <Paper elevation={6} style={{ width: '50vw', height: '500px', fontFamily: 'Lexend', display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: "flex", alignItems: "center",  flexDirection: "column", width: "50vw"}}>
                <Typography variant="h3" style={{ marginTop: '60px'}}>Sign Up</Typography>
                  <Stack spacing={5} justifyContent="center" style={{ marginTop: "50px" }}>
                    <TextField label="Username" variant="filled" style={{ width: "400px"}} />
                    <TextField label="Password" variant="filled" style={{ width: "400px" }} />
                    <Button variant="contained">Sign Up</Button>
                    <p style={{ marginLeft: "15%" }}>Already have an account? <Link href='/signin' underline="none" >Sign in</Link></p>
                  </Stack>
                </div>
        </Paper>
    </div>
    </>
  )
}
