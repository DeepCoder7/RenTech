import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarsRating from 'stars-rating';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import Modal from 'react-modal';
import notifyContext from '../../contexts/NotificationBar/notifyContext';

Modal.setAppElement('#root');

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#e2e2e9',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100',
    height: '350px',
    margin: '10px',
    padding: '5px',
    backgroundColor: 'ghostwhite',
    borderRadius: '10px',
  },
  contentShift: {
    display: 'flex',
    justifyContent: 'center',
    width: '100',
    height: '200px',
    margin: '2px',
    padding: '4px',
    backgroundColor: 'ghostwhite',
    borderRadius: '10px',
  },
  contentShiftDe: {
    display: 'flex',
    justifyContent: 'center',
    width: '100',
    height: '280px',
    margin: '6px',
    padding: '4px',
    backgroundColor: 'ghostwhite',
    borderRadius: '10px',
  },
  comments: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px',
    padding: '20px',
    width: '95%',
    height: '170px',
    borderRadius: '10px',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  commentShift: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '8px',
    padding: '20px',
    width: '90%',
    height: '170px',
    borderRadius: '10px',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  img: {
    padding: ' 10px',
    // maxWidth: '450px',
  },
  overallRating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '37%',
  },
  overallRatingShift: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
  mY1: {
    marginTop: 0,
    marginBottom: 0,
  },
  mY2: {
    marginTop: theme.spacing(1),
  },
  font15: {
    fontSize: '15px',
  },
  font27: {
    fontSize: '27px',
  },
  font20: {
    fontSize: '20px',
  },
  fontNormal: {
    // backgroundColor: 'none'
  },
}));
const ProductPage = (props) => {
  const classes = useStyles();
  const notifyCon = useContext(notifyContext);
  const { notify } = notifyCon;

  const params = useParams();
  const [overAllRating, setOverAllRating] = useState(0);
  const [rateOfProduct, setrateOfProduct] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [isRateModal, setIsRateModal] = useState(false);
  const [rateDetails, setRateDetails] = useState({ rating: 0, ratingDesc: '' });

  const matches = useMediaQuery('(min-width:600px)');

  const onChange = (e) => {
    setRateDetails({ ...rateDetails, [e.target.name]: e.target.value });
  };

  const sendRequest = async (e) => {
    const respOfRequest = await fetch(
      `http://localhost:8500/api/notifyUS/sendNotify/${productDetails.userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('renToken'),
        },
        body: JSON.stringify({
          messageNote: 'User is requested you to rent your product',
          role: 'userToUser',
          proID: productDetails._id,
        }),
      }
    );
    const productJson = await respOfRequest.json();
    if (productJson.success) {
      notify('success', 'Request is send Successfully');
      console.log('OK');
    } else {
      notify('error', productJson.message);
    }
  };

  const getProduct = async () => {
    const resp = await fetch(
      `http://localhost:8500/api/productDetail/getProductDe/${params.productID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const productJson = await resp.json();
    if (productJson.success) {
      setProductDetails(productJson.product);
    } else {
      setProductDetails('');
    }
  };

  const submitRate = async (e) => {
    e.preventDefault();
    console.log(rateDetails);
    const resp = await fetch(
      `http://localhost:8500/api/productDetail/ratePorduct/${params.productID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('renToken'),
        },
        body: JSON.stringify(rateDetails),
      }
    );
    const Pjson = await resp.json();
    if (Pjson.success) {
      getProduct();
      notify('success', 'Rating recorded');
    } else {
      notify('error', Pjson.message);
      setIsRateModal(false);
    }
    setRateDetails({ rating: 0, ratingDesc: '' });
  };
  useEffect(() => {
    if (productDetails.ratingOfProduct) {
      let ratingOfPro = JSON.parse(productDetails.ratingOfProduct);
      let sumOfRating = 0;
      ratingOfPro.forEach((prod) => {
        sumOfRating += Number(prod.rating);
      });
      sumOfRating = sumOfRating / ratingOfPro.length;
      setOverAllRating(sumOfRating);
      setrateOfProduct(ratingOfPro);
    }
  }, [productDetails]);
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={6}
            className={clsx(classes.content, {
              [classes.contentShift]: !matches,
            })}
            style={{ backgroundColor: 'white' }}
          >
            <img
              className={classes.img}
              src={productDetails.productImage}
              alt='Not Found'
            />
          </Paper>
        </Grid>
        <Modal
          isOpen={isRateModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(115,115,115,0.2)',
            },
            content: {
              width: matches ? '20rem' : '17rem',
              marginTop: matches ? '10%' : '40%',
              marginLeft: matches ? '40%' : '0%',
              height: '210px',
            },
          }}
        >
          <form onSubmit={submitRate}>
            <TextField
              label='Rating'
              required
              name='rating'
              variant='outlined'
              inputProps={{ min: 0.0, max: 5.0 }}
              type='number'
              onChange={onChange}
              defaultValue={0}
              fullWidth
            />
            <TextField
              className={classes.mY2}
              label='Reason'
              required
              name='ratingDesc'
              variant='outlined'
              onChange={onChange}
              fullWidth
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '5px',
              }}
            >
              <Button
                variant='contained'
                color='secondary'
                onClick={() => {
                  setIsRateModal(false);
                }}
              >
                Close
              </Button>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                // onClick={() => {
                //   setIsRateModal(false);
                // }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={6}
            className={clsx(classes.content, {
              [classes.contentShiftDe]: !matches,
            })}
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingLeft: '20px',
              paddingRight: '30px',
            }}
          >
            <Typography
              variant='h4'
              className={clsx(classes.fontNormal, {
                [classes.font27]: !matches,
              })}
            >
              {productDetails.productName}
            </Typography>
            <Typography
              className={clsx(classes.fontNormal, {
                [classes.font15]: !matches,
              })}
            >
              <b>Model : </b> {productDetails.model}
            </Typography>
            <div
              className={clsx(classes.overallRating, {
                [classes.overallRatingShift]: !matches,
              })}
            >
              <b>Overall Rating:</b>
              <StarsRating
                count={5}
                value={overAllRating}
                size={matches ? 25 : 20}
                color1={'grey'}
                color2={'#ffd700'}
                edit={false}
              />
            </div>
            <Typography
              className={clsx(classes.fontNormal, {
                [classes.font15]: !matches,
              })}
            >
              <b>Price:</b> {productDetails.price}₹ For{' '}
              {productDetails.duration} days
            </Typography>
            <Typography
              className={clsx(classes.fontNormal, {
                [classes.font15]: !matches,
              })}
            >
              <b>No Of product:</b> {productDetails.noOfProduct}
            </Typography>
            <Typography
              className={clsx(classes.fontNormal, {
                [classes.font15]: !matches,
              })}
            >
              <b>Location: </b> {productDetails.location}
            </Typography>
            <Typography
              className={clsx(classes.fontNormal, {
                [classes.font15]: !matches,
              })}
            >
              <b>Description:</b> {productDetails.proDesc}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size='small'
                variant='contained'
                color='inherit'
                onClick={sendRequest}
              >
                Take Rent
              </Button>
              <Button
                size='small'
                variant='contained'
                color='inherit'
                onClick={() => {
                  setIsRateModal(true);
                }}
              >
                Give Rating
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={1}
            className={clsx(classes.comments, {
              [classes.commentShift]: !matches,
            })}
          >
            <div style={{ width: '100%' }}>
              <Typography
                variant='h4'
                className={clsx(classes.fontNormal, {
                  [classes.font20]: !matches,
                })}
              >
                User Reviews
              </Typography>
              <div>
                {rateOfProduct &&
                  rateOfProduct.map((productEle, index) => {
                    return (
                      <ul
                        key={index}
                        style={{
                          listStyle: 'none',
                          backgroundColor: 'wheat',
                          width: '100%',
                        }}
                      >
                        <li>{productEle.userName}</li>
                        <li>
                          <StarsRating
                            count={5}
                            value={Number(productEle.rating)}
                            size={15}
                            color1={'blue'}
                            color2={'#ffd700'}
                            edit={false}
                          />
                        </li>
                        <li>
                          <Typography>{productEle.ratingDesc}</Typography>
                        </li>
                      </ul>
                    );
                  })}
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default ProductPage;
