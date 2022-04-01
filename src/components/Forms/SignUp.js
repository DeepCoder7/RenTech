import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  makeStyles,
  useMediaQuery,
  Link,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Close } from '@material-ui/icons';
import userContext from '../../contexts/userCred/userContext';
import notifyContext from '../../contexts/NotificationBar/notifyContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const useStyles = makeStyles((theme) => ({
  avatarStyle: {
    backgroundColor: '#1bbd7e',
  },
  btnFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2px',
  },
  mediaAvatarStyle: {
    backgroundColor: '#1bbd7e',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  closeBtn: {
    position: 'absolute',
    right: '14px',
    top: '20px',
  },
  mediaCloseBtn: {
    position: 'absolute',
    right: '14px',
    top: '13px',
  },
  my2: {
    marginTop: '7px',
  },
  cursorLink: {
    cursor: 'pointer',
  },
  OTPClose: {
    '&:hover': {
      backgroundColor: '#9a0036',
    },
  },
}));

const SignUp = (props) => {
  const userCon = useContext(userContext);
  const { getUser } = userCon;

  const notifyCon = useContext(notifyContext);
  const { notify } = notifyCon;

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const [selected, setSelected] = useState('male');
  const [otpModal, setOtpModal] = useState(false);

  const [otp, setOtp] = useState('');
  const [checkOTP, setCheckOTP] = useState('kkkk');

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const [signUpCreds, setSignUpCreds] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    location: '',
  });

  const OpenLogin = (e) => {
    e.preventDefault();
    props.setIsSignUpOpen(false);
    props.setIsLoginOpen(true);
  };

  const onChange = (e) => {
    setSignUpCreds({ ...signUpCreds, [e.target.name]: e.target.value });
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (signUpCreds.password.length >= 8 && signUpCreds.password.length <= 15) {
      const respo = await fetch('http://localhost:8500/api/auth/getOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpCreds),
      });

      const respJson = await respo.json();
      setCheckOTP(respJson.OTP);
      notify('success', 'Your OTP is send Successfully');
      setOtpModal(true);
    } else {
      notify('error', 'Password must be more than 8 char and less than 15');
    }
  };

  const CheckOTP = (e) => {
    if (checkOTP === otp) {
      console.log(otp);
      onSubmit();
    }
    console.log(otp, checkOTP);
    setOtpModal(false);
  };

  const onSubmit = async () => {
    console.log(signUpCreds);
    console.log(selected);
    // -------------------------------------
    const respo = await fetch('http://localhost:8500/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpCreds),
    });
    const Pjson = await respo.json();
    // ------------------------------------------
    if (Pjson.success) {
      localStorage.setItem('renToken', Pjson.authToken);
      getUser();
    } else {
      console.log('Error');
    }
    props.setIsSignUpOpen(false);
  };

  const handleReset = () => {
    setSelected('');
    setSignUpCreds({
      name: '',
      email: '',
      password: '',
      cpassword: '',
      location: '',
    });
  };

  return (
    <Grid>
      <Grid align='center'>
        <Modal
          isOpen={otpModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(115,115,115,0.2)',
            },
            content: {
              padding: 0,
              marginTop: '5px',
              width: matches ? '330px' : '230px',
              height: matches ? '205px' : '150px',
              top: matches ? '40%' : '30%',
              left: matches ? '40%' : '20%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            },
          }}
          // onRequestClose={() => setOtpModal(false)}
        >
          <Button
            className={classes.OTPClose}
            onClick={() => setOtpModal(false)}
          >
            Close
          </Button>
          <TextField
            label='OTP'
            variant='outlined'
            name='OTP'
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <Button
            size='small'
            variant='contained'
            color='primary'
            onClick={CheckOTP}
          >
            Confirm
          </Button>
        </Modal>
        <Button
          className={clsx(classes.closeBtn, {
            [classes.mediaCloseBtn]: !matches,
          })}
          color='secondary'
          onClick={() => props.setIsSignUpOpen(false)}
        >
          <Close />
        </Button>
        <Avatar
          className={clsx(classes.avatarStyle, {
            [classes.mediaAvatarStyle]: !matches,
          })}
        >
          <AddCircleOutlineOutlinedIcon />
        </Avatar>
        <h2 style={{ margin: '0', fontSize: !matches ? '1.25rem' : '1.5rem' }}>
          Sign Up
        </h2>
        <Typography variant='caption' gutterBottom>
          Please fill this form to create an account
        </Typography>
      </Grid>
      <form onSubmit={onSignUp}>
        <TextField
          label='Name'
          fullWidth
          placeholder='Enter Your Name'
          onChange={onChange}
          name='name'
          value={signUpCreds.name}
          required
        />
        <TextField
          label='Email'
          onChange={onChange}
          type='email'
          name='email'
          value={signUpCreds.email}
          fullWidth
          required
        />
        <FormControl component='fieldset' className={classes.btnFlex}>
          <FormLabel component='legend' className={classes.my2}>
            Gender
          </FormLabel>
          <RadioGroup
            aria-label='gender'
            name='gender1'
            onChange={handleChange}
            value={selected}
            style={{ display: 'initial' }}
          >
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          label='Location'
          value={signUpCreds.location}
          name='location'
          onChange={onChange}
          required
        />
        <TextField
          fullWidth
          type='password'
          value={signUpCreds.password}
          name='password'
          onChange={onChange}
          label='Password'
          required
        />
        <TextField
          fullWidth
          type='password'
          onChange={onChange}
          name='cpassword'
          value={signUpCreds.cpassword}
          label='Confirm Password'
          required
        />
        <Grid className={classes.btnFlex} style={{ marginTop: '10px' }}>
          <Button
            onClick={handleReset}
            size='small'
            type='reset'
            variant='contained'
            color='secondary'
          >
            Reset
          </Button>
          <Button
            type='submit'
            size='small'
            variant='contained'
            color='primary'
          >
            Sign Up
          </Button>
        </Grid>
      </form>
      <Typography style={{ marginTop: '5px' }}>
        Already have an account ?{' '}
        <Link className={classes.cursorLink} onClick={OpenLogin}>
          Log In
        </Link>
      </Typography>
    </Grid>
  );
};

export default SignUp;
