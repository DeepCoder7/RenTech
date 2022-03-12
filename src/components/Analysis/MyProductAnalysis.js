import React, { useContext, useEffect, useState } from 'react'
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';
import DoughnutChart from '../Charts/DoughnutChart';
import { useNavigate } from 'react-router-dom';
import modalContext from '../../contexts/modalOpener/modalContext';

// Analysis with ClickCount - Done
// Analysis with BookMarked - Done
// Analysis with rating - 
// Analysis with NoOfReport - 

const MyProductAnalysis = () => {
  const navigate = useNavigate();

  const modalOpener = useContext(modalContext);
  const { setIsLoginOpen } = modalOpener;

  const [productNames, setProductNames] = useState([]);
  // eslint-disable-next-line
  const [ratingsOfProduct, setRatingsOfProduct] = useState([]);
  const [clicksInProduct, setClicksInProduct] = useState([]);
  const [noOfBookMarked, setNoOfBookMarked] = useState([]);

  const [viewData, setViewData] = useState({
    labels: productNames,
    datasets: [{
      label: 'Over All products',
      data: clicksInProduct,
      backgroundColor: ['green', 'red', 'black'],
    }]
  });

  const [bookMarkedData, setBookMarkedData] = useState({
    labels: productNames,
    datasets: [{
      label: 'Over All products',
      data: noOfBookMarked,
      backgroundColor: ['green', 'red', 'black'],
    }]
  });

  const getData = async () => {
    const response = await fetch(`http://localhost:8500/api/productDetail/myProductAna`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('renToken')
      }
    })

    const Pjson = await response.json();
    setProductNames(Pjson.productNames);
    setRatingsOfProduct(Pjson.ratingOfProducts);
    setClicksInProduct(Pjson.noOfClicks);
    setNoOfBookMarked(Pjson.noOfBookMarked);
  }

  useEffect(() => {
    if (localStorage.getItem('renToken')) {
      getData();
    } else {
      setIsLoginOpen(true);
      navigate('/');
    }
    // eslint-disable-next-line
  }, [localStorage.getItem('renToken')])

  const generateRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    // console.log(productNames);
    let container = '';
    for (let i = 0; i < productNames.length; i++) {
      let color23 = generateRandomColor();
      if (!container.includes(color23)) {
        if (i === 0) {
          container += (`"${color23}"`);
        } else {
          container += (',' + `"${color23}"`);
        }
      } else {
        i--;
      }
    }
    setViewData({
      labels: productNames,
      datasets: [{
        label: 'No of Views',
        data: clicksInProduct,
        backgroundColor: JSON.parse(`[${container}]`),
      }]
    })

    setBookMarkedData({
      labels: productNames,
      datasets: [{
        label: 'No of BookMarked',
        data: noOfBookMarked,
        backgroundColor: JSON.parse(`[${container}]`),
      }]
    })

    console.log(bookMarkedData);
    // eslint-disable-next-line
  }, [noOfBookMarked])

  return (
    <div style={{ display: 'flex', flexWrap:'wrap', width: '100%' }}>
      <div style={{ width: '45%', marginRight:'10px' }}>
        <BarChart key={1} chartData={bookMarkedData} />
        <h2>BarChart</h2>
      </div>
      <div style={{ width: '49%', marginLeft:'20px' }}>
        <DoughnutChart key={2} chartData={viewData} />
        <h2>DoughnutChart</h2>
      </div>
      <div style={{ width: '49%' }}>
        <LineChart key={3} chartData={viewData} />
        <h2>LineChart</h2>
      </div>
      <div style={{ width: '30%', marginLeft:'20px' }}>
        <PieChart chartData={viewData} />
        <h2>PieChart</h2>
      </div>
    </div>
  )
}

export default MyProductAnalysis