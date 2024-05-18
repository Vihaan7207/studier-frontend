import React from 'react';
import axios from 'axios';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';
import { useState } from 'react';

export default function StateWrapper() {

    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState('');
    const [loggedInProp, setLoggedInProp] = useState(false);

    function logIn(username, password) {
        // console.log(username, password);
        axios.get('http://localhost:5001/users')
        .then(res => {
            const logInUser = res.data.filter((user) => user.username === username)[0];
            console.log(logInUser);
            console.log(JSON.stringify(logInUser))
            setLoggedInUser(JSON.stringify(logInUser));
            localStorage.setItem('studier:loggedIn', true);
            localStorage.setItem('studier:user', loggedInUser);
            setLoggedInProp(true);
            if (logInUser.password === password) {
                navigate('/home');
            }
            
        })
        .catch(error => {
            console.log(error);
        });
    }
    
  return (
    <div>
        <CssBaseline/>  
        <Routes>
            <Route path='/signin' element={<Signin logIn={logIn} />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/home' element={<Home user={loggedInUser} loggedIn={loggedInProp} />}/>
        </Routes>
    </div>
  )
}
