import React, { useContext } from 'react'
import { Box, Button, makeStyles } from '@material-ui/core'
import { ImportantDevices, LaptopChromebook, SportsEsports } from '@material-ui/icons';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import categoryContext from '../contexts/categories/categoryContext'
import { useLocation, useNavigate } from "react-router-dom";

const useStyle = makeStyles({
    Category: {
        flexGrow: 1,
        display: 'flex',
    },
})

const Category = () => {
    const classes = useStyle();
    const context = useContext(categoryContext);
    let location = useLocation();
    const navigate = useNavigate();
    const { category, setCategory } = context;

    const changeCat = (value) => {
        setCategory(value);
        if(location.pathname !== '/'){
            navigate('/')
        }
    }

    return (
        <Box justifyContent='space-around' className={classes.Category}>
            <Button variant="contained" onClick={() => changeCat('Computer')} disabled={category === 'Computer'} value='Computer'><ImportantDevices /></Button>
            <Button variant="contained" onClick={() => changeCat('Laptop')} disabled={category === 'Laptop'} value='Laptop'><LaptopChromebook /></Button>
            <Button variant="contained" onClick={() => changeCat('Console')} disabled={category === 'Console'} value='Console'><SportsEsports /></Button>
            <Button variant="contained" onClick={() => changeCat('Camera')} disabled={category === 'Camera'} value='Camera'><PhotoCameraIcon /></Button>
        </Box>
    )
}

export default Category
