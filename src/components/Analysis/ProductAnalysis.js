import React, { useEffect, useState } from 'react'
import DoughnutChart from '../Charts/DoughnutChart';

const ProductAnalysis = () => {
    const [productNames, setProductNames] = useState([]);
    const [totalProduct, setTotalProduct] = useState([]);
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
        setTotalProduct(Pjson.totalProducts);
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setChartData({
            labels: productNames,
            datasets: [{
                label: 'Over All products',
                data: totalProduct,
                backgroundColor: ['green', 'red', 'blue'],
            }]
        })
    }, [totalProduct])


    return (
        <div style={{width:'700px'}}>
            <DoughnutChart chartData={chartData} />
        </div>
    )
}

export default ProductAnalysis