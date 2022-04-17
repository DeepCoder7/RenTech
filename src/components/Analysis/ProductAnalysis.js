import { Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import DoughnutChart from '../Charts/DoughnutChart';
import LineChart from '../Charts/LineChart';

const ProductAnalysis = () => {
    const [productNames, setProductNames] = useState([]);
    const [totalProduct, setTotalProduct] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);

    const [genders, setGenders] = useState([]);
    const [totalStrength, setTotalStrength] = useState([]);

    const [ratioOfGender, setRatioOfGender] = useState({
        labels: genders,
        datasets: [{
            label: 'Over All products',
            data: [],
            backgroundColor: ['green', 'red', 'black'],
        }]
    });

    const [popularData, setPopularData] = useState({
        labels: productNames,
        datasets: [{
            label: 'Over All products',
            data: [],
            backgroundColor: ['green', 'red', 'black'],
        }]
    })
    const [chartData, setChartData] = useState({
        labels: productNames,
        datasets: [{
            label: 'Over All products',
            data: totalProduct,
            backgroundColor: ['green', 'red', 'black'],
        }]
    });
    const getData = async () => {
        const response = await fetch(`http://localhost:8500/api/productDetail/totalProduct`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('renToken')
            }
        })

        const Pjson = await response.json();
        setProductNames(Pjson.productNames);
        setPopularProducts(Pjson.popularityOfProducts);
        setGenders(Pjson.genders);
        setTotalStrength(Pjson.totalStrength);
        setTotalProduct(Pjson.totalProducts);
    }

    const generateRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let container = '';
        for (let i = 0; i < productNames.length; i++) {
            let color23 = generateRandomColor();
            if (!container.includes(color23)) {
                if (i === 0) {
                    // eslint-disable-next-line
                    container += (`"${color23}"`);
                } else {
                    // eslint-disable-next-line
                    container += (',' + `"${color23}"`);
                }
            } else {
                i--;
            }
        }
        setChartData({
            labels: productNames,
            datasets: [{
                label: 'Over All products',
                data: totalProduct,
                backgroundColor: JSON.parse(`[${container}]`),
            }]
        })
        setRatioOfGender({
            labels: genders,
            datasets: [{
                label: 'Over All products',
                data: totalStrength,
                backgroundColor: JSON.parse(`[${container}]`),
            }]
        })
        setPopularData({
            labels: productNames,
            datasets: [{
                label: 'Popularity of Products',
                data: popularProducts,
                backgroundColor: JSON.parse(`[${container}]`),
            }]
        })
        // eslint-disable-next-line
    }, [totalProduct])


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-around",flexWrap:'wrap', marginTop: '10px', textAlign:'center' }}>
                <Paper elevation={5} style={{ width: '45%',display: "flex", backgroundColor:'rgba(200,200,230,0.39)',flexDirection:'column', alignItems:'center' }}>
                    <DoughnutChart chartData={chartData} />
                    <Typography>No Of Products</Typography>
                </Paper>
                <Paper elevation={5} style={{ width: '45%',display: "flex", backgroundColor:'rgba(200,200,230,0.39)', flexDirection:'column', alignItems:'center' }}>
                    <DoughnutChart chartData={ratioOfGender} />
                    <Typography>Total ratio of male and female users</Typography>
                </Paper>
                <Paper elevation={5} style={{ width: '70%', backgroundColor:'rgba(200,200,230,0.39)', marginTop: '20px' }}>
                    <LineChart chartData={popularData} />
                    <Typography>Popularity of Product</Typography>
                </Paper>
            </div>
        </>
    )
}

export default ProductAnalysis