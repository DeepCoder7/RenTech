import React, { useContext, useState, useEffect } from 'react'
import { Grid, Paper, makeStyles, Avatar, Divider, Typography } from '@material-ui/core'
import userContext from '../../contexts/userCred/userContext'

const useStyles = makeStyles((theme) => ({
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
  }
}));

const UserProfile = () => {
  const usrCon = useContext(userContext)
  const { userCreds, getUser } = usrCon

  useEffect(() => {
    if (localStorage.getItem('renToken')) {
      getUser();
    }
  }, [localStorage.getItem('renToken')])

  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Paper elevation={5} className={classes.userImage}>
          {/* <Avatar className={classes.avatar}>H</Avatar> */}
          <Avatar className={classes.avatar} alt="Remy Sharp" src="https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg" />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} >
        <Paper elevation={5} className={classes.userDetails} >
          <Typography>User Name : {userCreds.name}</Typography>
          <Divider orientation='horizontal' variant='fullWidth' />
          <Typography>Email : {userCreds.email}</Typography>
        </Paper>
      </Grid>
      < Grid item xs={12} sm={6} >
        <Paper elevation={5} className={classes.userDetails}>
          <Typography>Location : {userCreds.location}</Typography>
          <Divider orientation='horizontal' variant='fullWidth' />
          <Typography>Date : {userCreds.date}</Typography>
        </Paper>
      </Grid>
    </Grid >
  )
}

export default UserProfile