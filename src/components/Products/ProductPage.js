import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarsRating from 'stars-rating';
import { useParams } from 'react-router-dom';

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
    backgroundColor: 'grey',
    borderRadius: '10px',
  },
  comments: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '28px',
    padding: '20px',
    width: '90%',
    height: '170px',
    borderRadius: '10px',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  img: {
    padding: ' 10px',
    maxWidth: '250px',
  },
}));
const ProductPage = (props) => {
  const classes = useStyles();
  const params = useParams();
  const [productDetails, setProductDetails] = useState([]);

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
    console.log(productJson);
  };
  useEffect(() => {
    console.log(params.productID);
    getProduct();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={6}
            className={classes.content}
            style={{ backgroundColor: 'white' }}
          >
            <img className={classes.img} src={productDetails.productImage} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={6}
            className={classes.content}
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingLeft: '30px',
              paddingRight: '30px',
            }}
          >
            <Typography variant='h4'>{productDetails.productName}</Typography>
            <div>
              <Typography>Overall Rating:</Typography>
              <StarsRating
                count={5}
                value={4.5}
                size={40}
                color1={'blue'}
                color2={'#ffd700'}
                edit={false}
              />
            </div>
            <Typography>Price: {productDetails.price}₹</Typography>
            <Typography>Location: {productDetails.location}</Typography>
            <Typography>
              Description: {productDetails.proDesc} Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Exercitationem cumque veritatis
              quisquam sint.
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='small' variant='contained' color='inherit'>
                Take Rent
              </Button>
              <Button size='small' variant='contained' color='inherit'>
                Give Rating
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={1} className={classes.comments}>
            <div>
              <Typography variant='h4'>User Reviews</Typography>
              <div>
                <ul style={{ listStyle: 'none', backgroundColor: 'wheat' }}>
                  <li>User Name</li>
                  <li>
                    <StarsRating
                      count={5}
                      value={4.5}
                      size={15}
                      color1={'blue'}
                      color2={'#ffd700'}
                      edit={false}
                    />
                  </li>
                  <li>
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ab a voluptatum quos inventore officia eum, libero culpa
                      itaque maiores eligendi? Necessitatibus, nobis. Fuga culpa
                      aliquam, quo fugiat numquam necessitatibus, illum minus
                      earum doloremque iusto, vitae adipisci! Omnis, corporis
                      nisi nihil accusantium necessitatibus modi?
                    </Typography>
                  </li>
                </ul>
                <ul style={{ listStyle: 'none', backgroundColor: 'wheat' }}>
                  <li>User Name</li>
                  <li>
                    <StarsRating
                      count={5}
                      value={3.5}
                      size={20}
                      color1={'blue'}
                      color2={'#ffd700'}
                      edit={false}
                    />
                  </li>
                  <li>
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ab a voluptatum quos inventore officia eum, libero culpa
                      itaque maiores eligendi? Necessitatibus, nobis. Fuga culpa
                      aliquam, quo fugiat numquam necessitatibus, illum minus
                      earum doloremque iusto, vitae adipisci! Omnis, corporis
                      nisi nihil accusantium necessitatibus modi?
                    </Typography>
                  </li>
                </ul>
                <ul style={{ listStyle: 'none', backgroundColor: 'wheat' }}>
                  <li>User Name</li>
                  <li>
                    <StarsRating
                      count={5}
                      value={3}
                      size={20}
                      color1={'blue'}
                      color2={'#ffd700'}
                      edit={false}
                    />
                  </li>
                  <li>
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ab a voluptatum quos inventore officia eum, libero culpa
                      itaque maiores eligendi? Necessitatibus, nobis. Fuga culpa
                      aliquam, quo fugiat numquam necessitatibus, illum minus
                      earum doloremque iusto, vitae adipisci! Omnis, corporis
                      nisi nihil accusantium necessitatibus modi?
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default ProductPage;
