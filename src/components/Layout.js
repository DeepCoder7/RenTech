import React, { useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMediaQuery, Divider, List, ListItem, ListItemText, Typography, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 60,
        marginTop: 60,
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // marginTop: 50
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: 60,
        backgroundColor: '#272B40',
        color: 'white'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        marginTop: 120
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    divider: {
        // Theme Color, or use css color in quote
        background: '#e2e2e2',
    },
    title: {
        marginTop: 10,
        marginBottom: 10,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
}));

const Layout = ({ open, children }) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        console.log(matches);
    }, [matches])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        RentTech
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Typography
                    variant='h5'
                    align='center'
                    className={classes.title}
                >
                    RenTech
                </Typography>
                <Divider classes={{ root: classes.divider }} />
                <List >
                    <Link to='/' className={classes.link}>
                        <ListItem button>
                            <ListItemText primary={'Home'} />
                        </ListItem>
                    </Link>
                    <Link to='/myProduct' className={classes.link}>
                        <ListItem button>
                            <ListItemText primary={'MyProduct'} />
                        </ListItem>
                    </Link>
                    <Link to='/postProduct' className={classes.link}>
                        <ListItem button>
                            <ListItemText primary={'PostProduct'} />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {children}
            </main>
        </div>
    );
}

export default Layout
