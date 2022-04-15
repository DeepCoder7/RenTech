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
import React, { useState } from 'react';
import Modal from 'react-modal';
import clsx from 'clsx';

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
      width: '40%',
      height: '100%'
    },
    '& > .MuiCardContent-root': {
      padding: '9px'
    },
  },
  RightIcon: {
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
  },
  RightIconAfterMedia: {
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
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

const MyProductCard = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const { productName, price, location, productImage, available, proDesc } = props.product;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [positionVal, setPositionVal] = useState({ xValue: 0, yValue: 0 });

  const openModal = e => {
    setPositionVal({ xValue: e.clientX, yValue: e.clientY });
    setModalIsOpen(true);
  }

  const DeleteProductCard = () => {
    setModalIsOpen(false);
    props.DeleteProduct(props.product);
  }

  const productUpdate = () => {
    setModalIsOpen(false);
    props.updateProduct(props.product)
  }

  return (
    <>
      <Grid item xs={12} sm={4}>
        <Modal
          isOpen={modalIsOpen}
          style={
            {
              overlay: {
                backgroundColor: 'rgba(115,115,115,0.2)'
              },
              content: {
                padding: 0,
                width: '105px',
                height: '86px',
                top: positionVal.yValue,
                left: positionVal.xValue - 100,
              }
            }
          }
          onRequestClose={() => setModalIsOpen(false)}
        >
          <Typography variant='h6' align='center' className={classes.OptionUser} onClick={productUpdate}>Update</Typography>
          <Typography variant='h6' align='center' className={classes.OptionUser} onClick={DeleteProductCard}>Delete</Typography>
        </Modal>
        <Card className={clsx(classes.root, {
          [classes.rootAfterClsx]: !matches
        })}>
          <CardActionArea className={clsx(classes.root, {
            [classes.contentAreaShift]: !matches
          })}>
            {/* for Image */}
            <CardMedia
              component='img'
              alt='Laptop'
              height={matches ? '200' : '100%'}
              src={productImage}
              title='Laptop'
            />
            {/* For Details */}
            <CardContent>
              <Typography className={clsx(classes.fontNormal, {
                [classes.font14]: !matches
              })} gutterBottom variant='h6' component='h2'>
                <span>{productName}</span>
                <IconButton className={clsx(classes.RightIcon, {
                  [classes.RightIconAfterMedia]: !matches
                })} onClick={openModal} component='span'>
                  <MoreVert className={clsx(classes.IconSize, {
                    [classes.IconSizeAfterMedia]: !matches
                  })} />
                </IconButton>
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
                  {available?'Available':'Not Available'}
                </Typography>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default MyProductCard;
