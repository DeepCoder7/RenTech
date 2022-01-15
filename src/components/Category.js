import React, { useContext } from 'react'
import { Box, Button, makeStyles } from '@material-ui/core'
import { ImportantDevices, LaptopChromebook, SportsEsports } from '@material-ui/icons';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import categoryContext from '../contexts/categories/categoryContext'

const useStyle = makeStyles({
    Category: {
        flexGrow: 1,
        display: 'flex',
    },
})

const Category = () => {
    const classes = useStyle();
    const context = useContext(categoryContext);
    const { category, setCategory } = context;

    return (
        <Box justifyContent='space-around' className={classes.Category}>
            <Button variant="contained" onClick={() => setCategory('Computer')} disabled={category==='Computer'} value='Computer'><ImportantDevices /></Button>
            <Button variant="contained" onClick={() => setCategory('Laptop')} disabled={category==='Laptop'} value='Laptop'><LaptopChromebook /></Button>
            <Button variant="contained" onClick={() => setCategory('Console')} disabled={category==='Console'} value='Console'><SportsEsports /></Button>
            <Button variant="contained" onClick={() => setCategory('Camera')} disabled={category==='Camera'} value='Camera'><PhotoCameraIcon /></Button>
        </Box>
    )
}

export default Category
