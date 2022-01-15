import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        backgroundColor: '#e2e2e9',
    }
});

const ProductCard = (props) => {
    const classes = useStyles();
    const { productName, price, location, productImage } = props.product;
    return (
        <Grid item xs={6} sm={4}>

            <Card className={classes.root}>
                <CardActionArea>
                    {/* for Image */}
                    <CardMedia
                        component="img"
                        alt="Laptop"
                        height="200"
                        src={`http://${productImage}`}
                        title="Laptop"
                    />
                    {/* For Details */}
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            All description will be displayed here
                        </Typography>
                        <Typography variant="subtitle1" >
                            Price: <Typography variant="subtitle2" component="span">${price}</Typography>
                        </Typography>
                        <Typography variant="subtitle1" >
                            Location: <Typography variant="subtitle2" component="span"> {location}</Typography>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default ProductCard
