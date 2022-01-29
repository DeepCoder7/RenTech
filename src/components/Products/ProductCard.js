import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import Modal from 'react-modal';

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
    padding: '5px',
    '&:hover': {
      backgroundColor: 'rgba(110,110,110,0.35)',
    },
  },
});

const ProductCard = (props) => {
  const classes = useStyles();
  const { productName, price, location, productImage } = props.product;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [positionVal, setPositionVal] = useState({ xValue: 0, yValue: 0 });

  const openModal = (e) => {
    setPositionVal({ xValue: e.clientX, yValue: e.clientY });
    setModalIsOpen(true);
  };
  const UserChoice = (uChoice) => {
    console.log(uChoice);
    setModalIsOpen(false);
  };

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
        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: {
              backgroundColor: 'rgba(115,115,115,0.2)',
            },
            content: {
              padding: 0,
              width: '115px',
              height: '86px',
              top: positionVal.yValue,
              left: positionVal.xValue,
            },
          }}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <Typography
            variant='h6'
            align='center'
            className={classes.OptionUser}
            onClick={() => UserChoice('Report')}
          >
            Report
          </Typography>
          <Typography
            variant='h6'
            align='center'
            className={classes.OptionUser}
            onClick={addBookMarkProducts}
          >
            BookMark
          </Typography>
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
                {/* <Button className={classes.Right} onClick={openModal}><MoreVert /></Button> */}
                <span className={classes.Right} onClick={openModal}>
                  <MoreVert />
                </span>
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
