import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Close } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: '10px',
    },
  },
  cursorLink : {
      cursor: 'pointer'
  }
}));

const LogIn = (props) => {
  const classes = useStyles();
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
    localStorage.setItem('renToken', json.authToken);
    props.setIsLoginOpen(false);
    navigate('/');
    if (json.success) {
      // Save the auth token and redirect
    }
  };

  const OpenSignUP = e =>{
      e.preventDefault();
      props.setIsLoginOpen(false);
      props.setIsSignUpOpen(true);
  }
  return (
    <Grid className={classes.root}>
      <Grid align='center'>
        <Button
          style={{ position: 'absolute', right: '14px', top: '20px' }}
          color='secondary'
          onClick={() => props.setIsLoginOpen(false)}
        >
          <Close />
        </Button>
        <Avatar style={avatarStyle}>
          <LockOutlinedIcon />
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
        <FormControlLabel
          control={<Checkbox name='checkedB' color='primary' />}
          label='Remember Me'
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
        <Link href='#'>Forgot Password ?</Link>
      </Typography>
      <Typography>
        Do you have an account ? <Link className={classes.cursorLink} onClick={OpenSignUP}>Sign up</Link>
      </Typography>
    </Grid>
  );
};

export default LogIn;
