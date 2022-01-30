import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SignUp from './Forms/SignUp';
import Modal from 'react-modal';
import { Menu } from '@material-ui/icons';
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import Login from './Forms/Login';
import { useNavigate } from 'react-router-dom';
import modalContext from '../contexts/modalOpener/modalContext';

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
  const classes = useStyles();

  const modalOpener = useContext(modalContext);
  const { isSignUpOpen, setIsSignUpOpen, isLoginOpen, setIsLoginOpen } =
    modalOpener;

  const logOut = (e) => {
    // e.preventDefault();
    localStorage.removeItem('renToken');
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
                  onClick={SingUpClick}
                >
                  Sign-Up
                </Button>
                <Button
                  color='inherit'
                  variant='outlined'
                  onClick={LogInClick}
                  style={{ marginLeft: '10px' }}
                >
                  Log-In
                </Button>
              </>
            ) : (
              <Button color='inherit' variant='outlined' onClick={logOut}>
                Log Out
              </Button>
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
            width: '503px',
            marginTop: '6.6%',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '580px',
          },
        }}
      >
        <SignUp setIsSignUpOpen={setIsSignUpOpen} />
      </Modal>
      <Modal
        isOpen={isLoginOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(115,115,115,0.2)',
          },
          content: {
            width: '503px',
            marginTop: '6.6%',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '580px',
          },
        }}
      >
        <Divider variant='middle' />
        <Login
          setIsLoginOpen={setIsLoginOpen}
          setIsSignUpOpen={setIsSignUpOpen}
        />
      </Modal>
    </>
  );
};

export default HeadBar;
