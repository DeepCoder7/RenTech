import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SignUp from './Forms/SignUp';
import Modal from 'react-modal';
import { Close, Menu } from '@material-ui/icons';
import { Divider, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';

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
        justifyContent: 'center'
    },
    wrap: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    close: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

Modal.setAppElement('#root');

const HeadBar = (props) => {

    const classes = useStyles();
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    useEffect(() => {
        // console.log(localStorage.getItem('renToken'));
        console.log(authToken);
    }, [localStorage.getItem('renToken')]);
    
    const logOut = e => {
        // e.preventDefault();
        localStorage.removeItem('renToken');
    }
    return (
        <>
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.Appbar}>
                    <Toolbar className={classes.wrap}>
                        <IconButton onClick={() => { props.ToggleBar(); }} edge='start' className={classes.menuButton} color='inherit' aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            RenTech
                        </Typography>
                        {!localStorage.getItem('renToken') ? <>
                            <Button color='inherit' variant='outlined' onClick={() => setIsSignUpOpen(true)}>
                                Sign-In
                            </Button>
                            <Button color='inherit' variant='outlined' style={{ marginLeft: '10px' }}>
                                Log-In
                            </Button>
                        </> : <Button color='inherit' variant='outlined' onClick={logOut}>Log Out</Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
            <Modal
                isOpen={isSignUpOpen}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(115,115,115,0.2)',
                        },
                        content: {
                            width: '1000px',
                            marginTop: '5.5%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            height: '580px',
                        }
                    }
                }
            >
                <div className={classes.close}>
                    <Typography variant='h6' align='center' style={{ width: '100%' }} >Sign UP</Typography>
                    <Button color="secondary" onClick={() => setIsSignUpOpen(false)}><Close /></Button>
                </div>
                <Divider variant="middle" />
                <SignUp setIsSignUpOpen={setIsSignUpOpen} />
            </Modal>
        </>
    )
}

export default HeadBar
