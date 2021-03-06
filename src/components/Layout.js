import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  InputBase,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Category from './Category';
import { Bookmark, Notifications } from '@material-ui/icons';
import categoryContext from '../contexts/categories/categoryContext';
import { useNavigate } from 'react-router-dom';
import Notification from './Modals/Notification';
import userContext from '../contexts/userCred/userContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  //1. for Root
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

  // for icons
  Icons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '5rem',
    height: '100%',
    cursor: 'pointer',
    // '& > *:hover': {
    //     borderRadius: '100%',
    //     backgroundColor: '#2f42a2',
    // }
  },

  IconsDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    width: '50%',
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
    color: 'white',
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
    marginTop: 120,
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const navigate = useNavigate();

  const context1 = useContext(categoryContext);
  const { search, setSearch } = context1;

  const userDet = useContext(userContext);
  const { userCreds } = userDet;

  useEffect(() => {
    console.log(localStorage.getItem('rolo'));
  }, [localStorage.getItem('rolo')])


  const searchProducts = async (e) => {
    e.preventDefault();
    console.log(search);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const clickNoti = (e) => {
    setIsNotificationOpen(true);
  };

  const ClickBookMark = () => {
    navigate('/myBookMark');
  };




  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Drawer */}
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Typography variant='h5' align='center' className={classes.title}>
          <div style={{ display: 'flex', marginLeft:'20%' }}>
            {localStorage.getItem('renToken')?<><Avatar className={classes.avatar} alt="Remy Sharp" src="https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg" />
            <Link to='/userProfile' className={classes.link}>
              <ListItem button>
                <ListItemText primary={userCreds.name} />
              </ListItem>
            </Link></>:'RenTech'
            }
          </div>
        </Typography>
        <Divider classes={{ root: classes.divider }} />
        <List>
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
          <Link to='/requestForProduct' className={classes.link}>
            <ListItem button>
              <ListItemText primary={'Request For Product'} />
            </ListItem>
          </Link>
          <Link to='/viewProdRequest' className={classes.link}>
            <ListItem button>
              <ListItemText primary={'View Requested Product'} />
            </ListItem>
          </Link>
          <Link to='/analysis/productAnalysis' className={classes.link}>
            <ListItem button>
              <ListItemText primary={'Analysis'} />
            </ListItem>
          </Link>
          {localStorage.getItem('rolo') === 'Admin' && <Link to='/admin/userDetails' className={classes.link}>
            <ListItem button>
              <ListItemText primary={'Admin'} />
            </ListItem>
          </Link>}
        </List>
      </Drawer>

      {/* AppBar for search and Notification Icon */}
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open && matches,
        })}
      >
        <Toolbar>
          <form onSubmit={searchProducts} className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search???'
              value={search}
              onChange={onSearch}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            {false && <button type='submit'>submit</button>}
          </form>
          {matches && <Category />}
          <div className={classes.Icons}>
            <IconButton color='inherit' onClick={clickNoti}>
              <Notifications />
            </IconButton>
            <IconButton color='inherit' onClick={ClickBookMark}>
              <Bookmark />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Notification
        isNotificationOpen={isNotificationOpen}
        setIsNotificationOpen={setIsNotificationOpen}
        matches={matches}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open && matches,
        })}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
