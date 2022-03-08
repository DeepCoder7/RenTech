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
            console.log(color23);
        }
        setChartData({
            labels: productNames,
            datasets: [{
                label: 'Over All products',
                data: totalProduct,
                backgroundColor: JSON.parse(`[${container}]`),
            }]
        })
    }, [totalProduct])


    return (
        <div style={{ width: '700px' }}>
            <DoughnutChart chartData={chartData} />
        </div>
    )
}

export default ProductAnalysis