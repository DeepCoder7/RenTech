import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Close } from '@material-ui/icons';

const SignUp = (props) => {
  const [selected, setSelected] = useState('male');

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

  const onChange = (e) => {
    setSignUpCreds({ ...signUpCreds, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
    localStorage.setItem('renToken', Pjson.authToken);
    props.setIsSignUpOpen(false);
    // ------------------------------------------
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

  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };

  const avatarStyle = { backgroundColor: '#1bbd7e' };

  const btnFlex = { display: 'flex', justifyContent: 'space-between' };

  return (
    <Grid>
      <Grid align='center'>
        <Button
          style={{ position: 'absolute', right: '14px', top: '20px' }}
          color='secondary'
          onClick={() => props.setIsSignUpOpen(false)}
        >
          <Close />
        </Button>
        <Avatar style={avatarStyle}>
          <AddCircleOutlineOutlinedIcon />
        </Avatar>
        <h2 style={{ margin: '0' }}>Sign Up</h2>
        <Typography variant='caption' gutterBottom>
          Please fill this form to create an account
        </Typography>
      </Grid>
      <form onSubmit={onSubmit}>
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
        <FormControl component='fieldset' style={{ marginTop: '10px' }}>
          <FormLabel component='legend'>Gender</FormLabel>
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
        <FormControlLabel
          control={<Checkbox name='checkedA' />}
          label='I accept the terms and conditions.'
        />
        <Grid style={btnFlex}>
          <Button
            onClick={handleReset}
            type='reset'
            variant='contained'
            color='secondary'
          >
            Reset
          </Button>
          <Button type='submit' variant='contained' color='primary'>
            Sign Up
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default SignUp;
