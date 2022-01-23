import { Button } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import productContext from '../../contexts/products/productContext'

const SignUp = (props) => {
  const [userCrad, setUserCrad] = useState({ name: '', location: '', email: '', password: '' });
  const onChange = e => {
    setUserCrad({ ...userCrad, [e.target.name]: e.target.value })
  }
  const productCon = useContext(productContext);
  const { setAuthToken } = productCon;
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(userCrad);
    const respo = await fetch('http://localhost:8500/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCrad)
    })
    const Pjson = await respo.json();
    localStorage.setItem('renToken', Pjson.authToken);
    props.setIsSignUpOpen(false);
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" onChange={onChange} value={userCrad.name} name="name" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">User Location</label>
          <input type="text" className="form-control" onChange={onChange} value={userCrad.location} name="location" id="location" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" onChange={onChange} value={userCrad.email} name="email" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} value={userCrad.password} name="password" id="password" />
        </div>
        <Button type='submit' variant='contained' color="primary">Submit</Button>
      </form>
    </>
  );
};

export default SignUp;
