import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { appTheme } from './themes/appTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={appTheme}>
        <CssBaseline/>  
        <Routes>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
