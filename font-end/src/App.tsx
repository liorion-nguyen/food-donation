import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './page/SignUp';
import Home from './page/Home';
import Login from './page/Login';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from './store/alert';

import Logo from './Images/Logo.svg'

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

      </Routes>
      <Routes>
        <Route
          path="/Login"
          element={<Login />}
        />
      </Routes>
      <Routes>
        <Route
          path="/SignUp"
          element={<SignUp />}
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
