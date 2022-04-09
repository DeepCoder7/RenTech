import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SignUp from './Forms/SignUp';
import Modal from 'react-modal';
import { Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import Login from './Forms/Login';
import { useNavigate } from 'react-router-dom';
import modalContext from '../contexts/modalOpener/modalContext';
import userContext from '../contexts/userCred/userContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  Appbar: {
    backgroundColor: '#2c2c2c',
    height: 60,
    justifyContent: 'center',
    flexWrap: 'wrap',
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  close: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

Modal.setAppElement('#root');

const HeadBar = (props) => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  const usrCon = useContext(userContext)
  const { userCreds, getUser } = usrCon

  const modalOpener = useContext(modalContext);
  const { isSignUpOpen, setIsSignUpOpen, isLoginOpen, setIsLoginOpen } =
    modalOpener;

  useEffect(() => {
    if (localStorage.getItem('renToken')) {
      getUser();
    }
  }, [localStorage.getItem('renToken')])


  const logOut = (e) => {
    // e.preventDefault();
    localStorage.removeItem('renToken');
    localStorage.removeItem('rolo');
    navigate('/');
  };

  const LogInClick = () => {
    setIsLoginOpen(true);
    if (isSignUpOpen) {
      setIsSignUpOpen(false);
    }
  };

  const SingUpClick = () => {
    setIsSignUpOpen(true);
    if (isLoginOpen) {
      setIsLoginOpen(false);
    }
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.Appbar}>
          <Toolbar className={classes.wrap}>
            <IconButton
              onClick={() => {
                props.ToggleBar();
              }}
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <Menu />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              RenTech
            </Typography>
            {!localStorage.getItem('renToken') ? (
              <>
                <Button
                  color='inherit'
                  variant='outlined'
                  size='small'
                  onClick={SingUpClick}
                >
                  Sign-Up
                </Button>
                <Button
                  color='inherit'
                  variant='outlined'
                  onClick={LogInClick}
                  size='small'
                  style={{ marginLeft: '10px' }}
                >
                  Log-In
                </Button>
              </>
            ) : (
              <div>
                <Link to='/userProfile' style={{
                  textDecoration: "none",
                  color: 'white',
                }} >{userCreds.name}</Link>
                <Button
                  color='inherit'
                  size='small'
                  variant='outlined'
                  onClick={logOut}
                  style={{ marginLeft: '25px' }}
                >
                  Log Out
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Modal
        isOpen={isSignUpOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(115,115,115,0.2)',
          },
          content: {
            width: matches ? '30rem' : '18rem',
            marginTop: matches ? '7rem' : '5.1rem',
            marginLeft: matches ? 'auto' : '0',
            marginRight: 'auto',
            height: matches ? '34rem' : '31.8rem',
          },
        }}
      >
        <SignUp
          setIsSignUpOpen={setIsSignUpOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      </Modal>
      <Modal
        isOpen={isLoginOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(115,115,115,0.2)',
          },
          content: {
            width: matches ? '30rem' : '18rem',
            marginTop: matches ? '7rem' : '5.5rem',
            marginLeft: matches ? 'auto' : '0',
            marginRight: 'auto',
            height: '28rem',
          },
        }}
      >
        <Login
          setIsLoginOpen={setIsLoginOpen}
          setIsSignUpOpen={setIsSignUpOpen}
        />
      </Modal>
    </>
  );
};

export default HeadBar;
