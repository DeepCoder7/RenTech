import React, { useState, useContext } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close, LockOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import userContext from '../../contexts/userCred/userContext';
import notifyContext from '../../contexts/NotificationBar/notifyContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: '10px',
    },
  },
  cursorLink: {
    cursor: 'pointer'
  }
}));

const LogIn = (props) => {
  const classes = useStyles();

  const userCon = useContext(userContext);
  const { getUser } = userCon;

  const notifyCon = useContext(notifyContext);
  const { notify } = notifyCon;


  const avatarStyle = {
    backgroundColor: '#1bbd7e',
  };

  const btnStyle = { margin: '8px 0' };

  const navigate = useNavigate();
  const [logDetail, setLogDetail] = useState({ email: '', password: '' });
  const onChange = (e) => {
    setLogDetail({ ...logDetail, [e.target.name]: e.target.value });
  };
  const SubmitLog = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8500/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logDetail),
    });
    const json = await response.json();

    console.log(json);

    if (json.success) {
      const status = json.user.active
      console.log(status);
      if (status) {

        // Save the auth token and redirect
        localStorage.setItem('renToken', json.authToken);
        getUser();
        navigate('/');

        notify("success", json.message)
        props.setIsLoginOpen(false);
      }
      else {
        // notify("error", "Your account has been deactivated by admin.")
        navigate("/deactivate")
        props.setIsLoginOpen(false);
      }
    } else {
      navigate('/')
      notify("error", json.message)
    }
  };

  const forgetPassword = () => {
    props.setIsLoginOpen(false);
    navigate('/forgetPass');
  }

  const OpenSignUP = e => {
    e.preventDefault();
    props.setIsLoginOpen(false);
    props.setIsSignUpOpen(true);
  }
  return (
    <>

      <Grid className={classes.root
      } >
        <Grid align='center'>
          <Button
            style={{ position: 'absolute', right: '14px', top: '20px' }}
            color='secondary'
            onClick={() => props.setIsLoginOpen(false)}
          >
            <Close />
          </Button>
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={SubmitLog} className={classes.root}>
          <TextField
            label='Username'
            placeholder='Enter Username'
            name='email'
            type='email'
            onChange={onChange}
            value={logDetail.email}
            fullWidth
            required
          />
          <TextField
            label='Password'
            placeholder='Enter Password'
            type='password'
            name='password'
            onChange={onChange}
            value={logDetail.password}
            fullWidth
            required
          />
          <Button
            type='submit'
            color='primary'
            variant='contained'
            style={btnStyle}
            fullWidth
          >
            Sign In
          </Button>
        </form>
        <Typography>
          <Link className={classes.cursorLink} onClick={forgetPassword}>Forgot Password ?</Link>
        </Typography>
        <Typography>
          Do you have an account ? <Link className={classes.cursorLink} onClick={OpenSignUP}>Sign up</Link>
        </Typography>
      </Grid >

    </>
  );
};

export default LogIn;
