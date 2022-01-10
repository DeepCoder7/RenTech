import { Box, Button, makeStyles } from '@material-ui/core'
import { ImportantDevices, LaptopChromebook, SportsEsports } from '@material-ui/icons';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import React from 'react'

const useStyle = makeStyles({
    Category: {
        flexGrow: 1,
        display: 'flex',
    },

})

const Category = () => {
    const classes = useStyle();
    return (
        <Box justifyContent='space-around' className={classes.Category}>
            <Button variant="contained" ><ImportantDevices /></Button>
            <Button variant="contained" ><LaptopChromebook /></Button>
            <Button variant="contained" ><SportsEsports /></Button>
            <Button variant="contained" ><PhotoCameraIcon /></Button>
        </Box>
    )
}

export default Category
