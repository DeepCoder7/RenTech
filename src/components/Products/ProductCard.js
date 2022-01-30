import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import ReportModal from '../Modals/ReportModal';
import modalContext from '../../contexts/modalOpener/modalContext';
import userContext from '../../contexts/userCred/userContext';

Modal.setAppElement('#root');

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    backgroundColor: '#e2e2e9',
  },
  Right: {
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
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
});

const ProductCard = (props) => {
  const modalOpener = useContext(modalContext);
  const { setIsReportOpen } = modalOpener;

  const userCon = useContext(userContext);
  const { reportProduct } = userCon;

  const classes = useStyles();
  const { productName, price, location, productImage } = props.product;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [positionVal, setPositionVal] = useState({ xValue: 0, yValue: 0 });

  const openModal = (e) => {
    setPositionVal({ xValue: e.clientX, yValue: e.clientY });
    setModalIsOpen(true);
  };
  const reportModalOn = () => {
    setIsReportOpen(true);
    setModalIsOpen(false);
  };

  const submitReport = (descOfReport) => {
    reportProduct(props.product.userId, props.product._id, descOfReport)
    // console.log(props.product, props.product._id, descOfReport);
  }

  const addBookMarkProducts = async () => {
    if (localStorage.getItem('renToken')) {
      const response = await fetch(
        'http://localhost:8500/api/auth/addBookMarkProducts',
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
      console.log(json);
      setModalIsOpen(false);
    } else {
      console.log('You need to must be logged in');
    }
  };

  return (
    <>
      <Grid item xs={12} sm={4}>
        {/* Modal for report section */}
        <ReportModal submitReport={submitReport} />

        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: {
              backgroundColor: 'rgba(115,115,115,0.2)',
            },
            content: {
              padding: 0,
              width: '130px',
              height: '102px',
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

          {true ? <Typography
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
              onClick={() => console.log('removed')}
            >
              RemoveFrom BookMark
            </Typography>}
        </Modal>

        <Card className={classes.root}>
          <CardActionArea>
            {/* for Image */}
            <CardMedia
              component='img'
              alt='Laptop'
              height='200'
              src={productImage}
              title='Laptop'
            />
            {/* For Details */}
            <CardContent>
              <Typography gutterBottom variant='h6' component='h2'>
                <span>{productName}</span>
                <IconButton className={classes.Right} onClick={openModal} component='span'>
                  <MoreVert />
                </IconButton>
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                All description will be displayed here
              </Typography>
              <Typography variant='subtitle1'>
                Price:{' '}
                <Typography variant='subtitle2' component='span'>
                  {price} &#x20B9;
                </Typography>
              </Typography>
              <Typography variant='subtitle1'>
                Location:{' '}
                <Typography variant='subtitle2' component='span'>
                  {location}
                </Typography>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
