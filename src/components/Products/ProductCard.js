import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import ReportModal from '../Modals/ReportModal';
import userContext from '../../contexts/userCred/userContext';
import productContext from '../../contexts/products/productContext';
import notifyContext from '../../contexts/NotificationBar/notifyContext';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    backgroundColor: '#e2e2e9',
  },
  rootAfterClsx: {
    maxWidth: '100%',
    backgroundColor: '#e2e2e9',
    '& > .MuiButtonBase-root': {
      justifyContent: 'start',
    }
  },
  contentAreaShift: {
    display: 'flex',
    height: '120px',
    '& > .MuiCardMedia-media': {
      width: '37%',
      height: '100%'
    },
    '& > .MuiCardContent-root': {
      width: '50%',
      padding: '9px'
    },
  },
  RightIcon: {
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    marginRight: '6px',
    marginTop: '6px'
  },
  RightIconAfterMedia: {
    display: 'flex',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    // left: '0%',
    position: 'relative',
    top: '-36px',
    left: '16px'
  },
  IconSize: {
    width: '1em',
    height: '1em',
  },
  IconSizeAfterMedia: {
    width: '18px',
    height: '18px',
  },
  OptionUser: {
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    marginTop: '3px',
    padding: '5px',
    '&:hover': {
      backgroundColor: 'rgba(110,110,110,0.35)',
    },
  },
  font12: {
    fontSize: '12px',
  },
  font14: {
    fontSize: '14px',
  },
  font10: {
    fontSize: '10px',
  },
  fontNormal: {
    // backgroundColor: 'none'
  },
});

const ProductCard = (props) => {

  const userCon = useContext(userContext);
  const { reportProduct, userCreds, getUser } = userCon;

  const context = useContext(productContext);
  const { MyBookMarkProducts } = context;

  const navigate = useNavigate();

  const notifyCOn = useContext(notifyContext);
  const { notify } = notifyCOn;

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  const { productName, price, location, productImage, available, proDesc } = props.product;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const [positionVal, setPositionVal] = useState({ xValue: 0, yValue: 0 });

  const openModal = (e) => {
    e.preventDefault();
    setPositionVal({ xValue: e.clientX, yValue: e.clientY });
    console.log("CardIcon");
    setModalIsOpen(true);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [localStorage.getItem('renToken')])


  const reportModalOn = () => {
    setIsReportOpen(true);
    setModalIsOpen(false);
  };

  const submitReport = (descOfReport) => {
    if (localStorage.getItem('renToken')) {
      const repoJson = reportProduct(props.product.userId, props.product._id, descOfReport);
      if (repoJson.success) {
        notify('success', repoJson.message)
      } else {
        notify('error', repoJson.message)
      }
    } else {
      notify('warn', 'Not Allowed')
    }
    // console.log(props.product, props.product._id, descOfReport);
  }

  const url = "http://localhost:8500/api/auth/";

  const addBookMarkProducts = async () => {
    if (localStorage.getItem('renToken')) {
      const response = await fetch(
        `${url}addBookMarkProducts`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-Token': localStorage.getItem('renToken'),
          },
          body: JSON.stringify({ productID: props.product._id }),
        }
      );
      const json = await response.json();
      if (json.success) {
        notify("success", "BookMark Successful");
      }
      getUser();
      setModalIsOpen(false);
    } else {
      notify("warn", 'You need to must be logged in');
      setModalIsOpen(false);
    }
  };

  const removeFromBookMark = async () => {
    if (localStorage.getItem('renToken')) {
      const response = await fetch(
        `${url}removeFromBookMark`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-Token': localStorage.getItem('renToken'),
          },
          body: JSON.stringify({ proId: props.product._id })
        }
      );
      const json = await response.json();
      if (json.success) {
        notify("success", "product is remove from bookMark");
        getUser();
        MyBookMarkProducts();
      }
      setModalIsOpen(false);
    } else {
      notify("warn", 'You need to must be logged in');
      setModalIsOpen(false);
    }
  }

  const increaseClick = async () => {
    const response = await fetch(
      `http://localhost:8500/api/productDetail/increaseClick/${props.product._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-Token': localStorage.getItem('renToken'),
        },
      }
    );
    const json = await response.json();
    console.log(json);
  }

  return (
    <>
      <Grid item xs={12} sm={4}>
        {/* Modal for report section */}
        <ReportModal isReportOpen={isReportOpen} setIsReportOpen={setIsReportOpen} submitReport={submitReport} />

        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: {
              backgroundColor: 'rgba(115,115,115,0.2)',
            },
            content: {
              padding: 0,
              width: '130px',
              height: '105px',
              top: positionVal.yValue,
              left: positionVal.xValue - 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            },
          }}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <Typography
            variant='h6'
            align='center'
            className={classes.OptionUser}
            onClick={reportModalOn}
          >
            Report
          </Typography>

          {!(userCreds.bookMarkProducts.includes(props.product._id)) ? <Typography
            variant='h6'
            align='center'
            className={classes.OptionUser}
            onClick={addBookMarkProducts}
          >
            BookMark
          </Typography> :
            <Typography
              variant='h6'
              align='center'
              className={classes.OptionUser}
              onClick={removeFromBookMark}
            >
              RemoveFrom BookMark
            </Typography>}
        </Modal>

        <Card className={clsx(classes.root, {
          [classes.rootAfterClsx]: !matches
        })}
        >
          <CardActionArea className={clsx(classes.root, {
            [classes.contentAreaShift]: !matches
          })}
          >
            {/* for Image */}
            <CardMedia
              component='img'
              alt='Laptop'
              height={matches ? '200' : '100%'}
              src={productImage}
              title='Laptop'
            />
            {/* For Details */}
            {matches && <IconButton className={clsx(classes.RightIcon, {
              [classes.RightIconAfterMedia]: !matches
            })} onClick={openModal} component='span'>
              <MoreVert className={clsx(classes.IconSize, {
                [classes.IconSizeAfterMedia]: !matches
              })} />
            </IconButton>}
            <CardContent onClick={() => { increaseClick(); navigate(`/productPage/${props.product._id}`); }}>
              <Typography className={clsx(classes.fontNormal, {
                [classes.font14]: !matches
              })} gutterBottom variant='h6' component='h2'>
                <span>{productName}</span>
              </Typography>
              <Typography className={clsx(classes.fontNormal, {
                [classes.font10]: !matches
              })} variant='body2' color='textSecondary' noWrap component='p'>
                {proDesc}
              </Typography>
              <Typography className={clsx(classes.fontNormal, {
                [classes.font12]: !matches
              })} variant='subtitle1'>
                Price:{' '}
                <Typography className={clsx(classes.fontNormal, {
                  [classes.font12]: !matches
                })} variant='subtitle2' component='span'>
                  {price} &#x20B9;
                </Typography>
              </Typography>
              <Typography className={clsx(classes.fontNormal, {
                [classes.font12]: !matches
              })} variant='subtitle1'>
                Location:{' '}
                <Typography className={clsx(classes.fontNormal, {
                  [classes.font12]: !matches
                })} variant='subtitle2' component='span'>
                  {location}
                </Typography>
              </Typography>
              <Typography className={clsx(classes.fontNormal, {
                [classes.font12]: !matches
              })} variant='subtitle1'>
                Status:{' '}
                <Typography className={clsx(classes.fontNormal, {
                  [classes.font12]: !matches
                })} variant='subtitle2' component='span'>
                  {available ? 'Available' : 'Not Available'}
                </Typography>
              </Typography>
            </CardContent>
            {!matches && <IconButton className={clsx(classes.RightIcon, {
              [classes.RightIconAfterMedia]: !matches
            })} onClick={openModal} component='span'>
              <MoreVert className={clsx(classes.IconSize, {
                [classes.IconSizeAfterMedia]: !matches
              })} />
            </IconButton>}
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
