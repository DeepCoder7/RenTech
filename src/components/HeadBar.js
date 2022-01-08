import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center'
    },
}))

const HeadBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.Appbar}>
                <Toolbar>
                    <IconButton onClick={()=>{props.ToggleBar();}} edge='start' className={classes.menuButton} color='inherit' aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        RentTech
                    </Typography>
                    <Button color='inherit'>
                        Sign-In
                    </Button>
                    <Button color='inherit'>
                        Log-In
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HeadBar
