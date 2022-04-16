import React, { useContext, useEffect, useState } from 'react'
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';
import DoughnutChart from '../Charts/DoughnutChart';
import { useNavigate } from 'react-router-dom';
import modalContext from '../../contexts/modalOpener/modalContext';
import { Paper, useMediaQuery } from '@material-ui/core';

// Analysis with ClickCount - Done
// Analysis with BookMarked - Done
// Analysis with rating - 
// Analysis with NoOfReport - 

const MyProductAnalysis = () => {
  const navigate = useNavigate();

  const modalOpener = useContext(modalContext);
  const { setIsLoginOpen } = modalOpener;

  const matches = useMediaQuery('(min-width:600px)');

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
  
  const [viewAllAna, setViewAllAna] = useState({
    labels: productNames,
    datasets: [{
      label: 'Over All products',
      data: clicksInProduct,
      backgroundColor: ['green', 'red', 'black'],
    }]
  });

  const [ratingData, setRatingData] = useState({
    labels: productNames,
    datasets: [{
      label: 'Over All products',
      data: ratingsOfProduct,
      backgroundColor: ['green', 'red', 'black'],
    }]
  })

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

    setRatingData({
      labels: productNames,
      datasets: [{
        label: 'OverAll Rating to the Product',
        data: ratingsOfProduct,
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
    
    setViewAllAna({
      labels: productNames,
      datasets: [{
        label: 'No of BookMarked',
        data: noOfBookMarked,
        backgroundColor: 'green',
      },{
        label: 'No of Views',
        data: clicksInProduct,
        backgroundColor: 'blue',
      },{
        label: 'OverAll Rating to the Product',
        data: ratingsOfProduct,
        backgroundColor: 'red',
      }]
    })

    // console.log(ratingsOfProduct);

    // console.log(bookMarkedData);
    // eslint-disable-next-line
  }, [noOfBookMarked])

  return (
    <div style={{ display: 'flex', flexWrap:matches?'wrap':'nowrap', flexDirection: matches?'row':'column', width: '100%', justifyContent: matches?'space-around':'center', textAlign:'center' }}>
      <Paper elevation={2} style={{ width: matches?'45%':'90%', backgroundColor:'rgba(200,200,200,0.4)', marginRight:'10px', marginBottom:'20px' }}>
        <BarChart key={1} chartData={bookMarkedData} />
        <h2>No Of BookMarks</h2>
      </Paper>
      <Paper style={{ width: matches?'30%':'94%', backgroundColor:'rgba(200,200,200,0.4)', marginLeft:'20px', display:'flex',flexDirection:'column', alignItems:'center', marginLeft:'1%' }}>
        <DoughnutChart key={2} chartData={viewData} />
        <h2>No. Of View in Product</h2>
      </Paper>
      <Paper style={{ height: '30%',width: matches?'39%':'85%', backgroundColor:'rgba(200,200,200,0.4)', marginTop: '20px' }}>
        <LineChart key={3} chartData={ratingData} />
        <h2>Overall Rating to the product</h2>
      </Paper>
      <Paper style={{ width: matches?'35%':'85%', backgroundColor:'rgba(200,200,200,0.4)', marginTop:'20px', padding:'20px' }}>
        <BarChart chartData={viewAllAna} />
        <h2>PieChart</h2>
      </Paper>
    </div>
  )
}

export default MyProductAnalysis