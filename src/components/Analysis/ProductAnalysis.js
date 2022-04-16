import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import DoughnutChart from '../Charts/DoughnutChart';
import LineChart from '../Charts/LineChart';

const ProductAnalysis = () => {
    const [productNames, setProductNames] = useState([]);
    const [totalProduct, setTotalProduct] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
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
                if (i == 0) {
                    container += (`"${color23}"`);
                } else {
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
        setPopularData({
            labels: productNames,
            datasets: [{
                label: 'Popularity of Products',
                data: popularProducts,
                backgroundColor: JSON.parse(`[${container}]`),
            }]
        })
    }, [totalProduct])


    return (
        <>
            <div style={{ display: "flex", flexDirection:'column', justifyContent: "space-between", marginTop: '10px' }}>
                <div style={{ width: '500px', alignSelf:'center' }}>
                    <Typography>No Of Products</Typography>
                    <DoughnutChart chartData={chartData} />
                </div>
                <div style={{ width: '70%', backgroundColor:'rgba(200,200,200,0.39)', marginTop: '10px' }}>
                    <LineChart chartData={popularData} />
                </div>
            </div>
        </>
    )
}

export default ProductAnalysis