import React, { useEffect } from 'react'
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { InputBase, useMediaQuery, Divider, List, ListItem, ListItemText, Typography, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Category from './Category';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    //1. for Roor 
    root: {
        display: 'flex',
    },

    //2. AppBar and It's Elements
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 60,
        marginTop: 60,
        // backgroundColor: 'white',
        // color: 'black',
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

    // 3. For the search Design
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },

    //4. For the drawer
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

    // 5. For the content
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
    const matches = useMediaQuery('(min-width:600px)');
    const classes = useStyles(matches);

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* Drawer */}
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

            {/* AppBar for search and Notification Icon */}
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: (open && matches),
                })}
            >
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    {matches && <Category />}
                </Toolbar>
            </AppBar>


            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: (open && matches),
                })}
            >
                {!matches && <Category />}
                {children}
            </main>
        </div>
    );
}

export default Layout
