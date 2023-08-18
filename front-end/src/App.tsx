import { Route, Routes } from 'react-router-dom';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

import { alertActions } from './store/alert';
import SignUp from './page/SignUp';
import Home from './page/Home';
import Login from './page/Login';

import Logo from './Images/home/main/Logo.svg'
import Profile from './page/Profile';

const firebaseConfig = {
  apiKey: "AIzaSyAL1I5MSnhqc4DiMDQI6BaO94LL6HBL4J0",
  authDomain: "food-donation-98ef2.firebaseapp.com",
  databaseURL: "https://food-donation-98ef2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "food-donation-98ef2",
  storageBucket: "food-donation-98ef2.appspot.com",
  messagingSenderId: "248853976799",
  appId: "1:248853976799:web:4b969b6972d04ba2f9fb6a",
  measurementId: "G-15GCR18LGX"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

function App(): JSX.Element {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert)

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(alertActions.hideAlert())
  };

  const action = (
    <Fragment>
      <Button size="small" onClick={() => { dispatch(alertActions.hideAlert()) }}
        style={{
          color: "white"
        }}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => { dispatch(alertActions.hideAlert()) }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = Logo;
  link.id = 'icon';

  document.head.appendChild(link);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/Login"
          element={<Login />}
        /> 
        <Route
          path="/SignUp"
          element={<SignUp />}
        />
        <Route 
          path="Profile"
          element={<Profile />}
        />
        <Route 
          path="*"
          element={<Home />}
        />
      </Routes>
      
      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={alert.contentAlert}
        action={action}
        sx={{
          '.MuiPaper-root': {
            background: alert.color ? 'green' : 'red'
          }
        }}
      />
    </div>
  );
}

export default App;
