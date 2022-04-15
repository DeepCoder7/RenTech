import React, { useContext, useState, useEffect } from 'react'
import { Grid, Paper, makeStyles, Avatar, Typography, FormControlLabel, Switch, useMediaQuery, TextField, Button } from '@material-ui/core'
import userContext from '../../contexts/userCred/userContext';
import clsx from 'clsx';
import categoryContext from '../../contexts/categories/categoryContext';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import notifyContext from '../../contexts/NotificationBar/notifyContext';

Modal.setAppElement('#root');

const useStyles = makeStyles(() => ({
  userImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "250px",
    backgroundColor: "#757de8"
  },
  avatar: {
    width: "120px",
    height: "120px"
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "200px",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#cfd8dc"
  },
  filterSet: {
    display: "flex",
    width: '40%',
    justifyContent: 'space-around'
  },
  filterSetAfter: {
    display: "flex",
    width: '90%',
    justifyContent: 'space-around'
  },

}));

const UserProfile = () => {
  const usrCon = useContext(userContext)
  const { userCreds, getUser } = usrCon;

  const filterCon = useContext(categoryContext);
  const { filterValue, setFilterValue } = filterCon;

  const navigate = useNavigate();

  const notifyCon = useContext(notifyContext);
  const { notify } = notifyCon;

  const [updateProf, setUpdateProf] = useState(false)
  const [currentUsrDtls, setCurrentUsrDtls] = useState({
    userName: '',
    location: '',
  })

  const matches = useMediaQuery('(min-width:600px)');

  const handleChange = e => {
    setFilterValue({ ...filterValue, status: !filterValue.status })
  }

  useEffect(() => {
    if (localStorage.getItem('renToken')) {
      getUser();
    }
    // eslint-disable-next-line
  }, [localStorage.getItem('renToken')])

  const onChange = e => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!filterValue.status) {
      setFilterValue({ location: '', maxPrice: 10000000, count: 1, status: false })
    }
    // eslint-disable-next-line
  }, [filterValue.status])

  const updateProfile = () => {
    setUpdateProf(true);
  }

  const changeUsrDtls = (e) => {
    setCurrentUsrDtls({ ...currentUsrDtls, [e.target.name]: e.target.value });
  }

  const updateUserPorfile = async (e) => {
    console.log(currentUsrDtls);
    await fetch('http://localhost:8500/api/auth/changeUserDetails', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('renToken')
      },
      body: JSON.stringify({ name: currentUsrDtls.userName, location: currentUsrDtls.location })
    });
    getUser();
    notify("success", "User Profile update successfully");
    setUpdateProf(false);
  }


  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Paper elevation={5} className={classes.userImage}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Avatar className={classes.avatar} alt="Remy Sharp" src="https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg" />
            <Button color="inherit" onClick={updateProfile}>Edit Profile</Button>
          </div>
          <Modal
            isOpen={updateProf}
            style={{
              overlay: {
                backgroundColor: 'rgba(115,115,115,0.2)',
              },
              content: {
                width: matches ? '40%' : '85%',
                height: matches ? '380px' : '50%',
                marginTop: matches ? '6%' : '28%',
                marginLeft: matches ? 'auto' : '-2%',
                marginRight: 'auto',
              },
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '45vh',
              justifyContent: 'space-evenly',
            }}>
              <TextField
                label='User Name'
                name='userName'
                required
                fullWidth
                variant='outlined'
                onChange={changeUsrDtls}
                defaultValue={userCreds.name}
                value={currentUsrDtls.name}
              />
              <TextField
                label='Location'
                name='location'
                required
                fullWidth
                variant='outlined'
                defaultValue={userCreds.location}
                onChange={changeUsrDtls}
                value={currentUsrDtls.name}
              />
              <Button color="inherit" onClick={() => { setUpdateProf(false); localStorage.removeItem('renToken'); navigate('/forgetPass') }}>change Password</Button>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  style={{ margin: '4px' }}
                  onClick={() => setUpdateProf(false)}
                  variant='contained'
                  color='secondary'
                >
                  Close
                </Button>
                <Button
                  style={{ margin: '4px' }}
                  type='submit'
                  onClick={updateUserPorfile}
                  variant='contained'
                  color='primary'
                >
                  Submit
                </Button>
              </div>
            </div>

          </Modal>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} >
        <Paper elevation={5} className={classes.userDetails} >
          <Typography>User Name : {userCreds.name}</Typography>

          <Typography>Email : {userCreds.email}</Typography>
          <Typography>Location : {userCreds.location}</Typography>

          <Typography>Date : {userCreds.date}</Typography>
        </Paper>
      </Grid>
      < Grid item xs={12} sm={6} >
        <Paper elevation={5} className={classes.userDetails}>
          <div className={clsx(classes.filterSet, {
            [classes.filterSetAfter]: !matches
          })}>
            <Typography variant='h5'>Filter Setting</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={filterValue.status}
                  onChange={handleChange}
                  name="filter"
                  color="primary"
                />
              }
              label="Filter"
            />
          </div>
          {filterValue.status && <>
            <TextField
              label='location'
              onChange={onChange}
              name='location'
              value={filterValue.location}
            />
            <TextField
              label='No Of Products'
              onChange={onChange}
              name='count'
              type='number'
              inputProps={{ min: 1 }}
              defaultValue={filterValue.count}
            />
            <TextField
              label='Max Price'
              onChange={onChange}
              name='maxPrice'
              type='number'
              inputProps={{ min: filterValue.minPrice }}
              defaultValue={filterValue.maxPrice}
            />
          </>}
        </Paper>
      </Grid>
    </Grid >
  )
}

export default UserProfile