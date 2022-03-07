import React, { useEffect, useState } from 'react'
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';
import DoughnutChart from '../Charts/DoughnutChart';

// Analysis with ClickCount - Done
// Analysis with BookMarked - Done
// Analysis with rating - 
// Analysis with NoOfReport - 

const MyProductAnalysis = () => {
  const onClick = () => {
    setTimeout(() => {
      console.log("Not Accepted");
    }, 15000);
  }

  const [productNames, setProductNames] = useState([]);
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
    getData();
  }, [])

  useEffect(() => {
    console.log(productNames);
    console.log(ratingsOfProduct);
    console.log(clicksInProduct);
    console.log(noOfBookMarked);
    setViewData({
      labels: productNames,
      datasets: [{
        label: 'No of Views',
        data: clicksInProduct,
        backgroundColor: ['green', 'red', 'blue'],
      }]
    })

    setBookMarkedData({
      labels: productNames,
      datasets: [{
        label: 'No of BookMarked',
        data: noOfBookMarked,
        backgroundColor: ['yellow', 'blue', 'red'],
      }]
    })
  }, [noOfBookMarked])

  return (
    <div style={{ width: '50%' }}>
      <BarChart key={1} chartData={bookMarkedData} />
      <DoughnutChart key={2} chartData={viewData} />
      <LineChart key={3} chartData={viewData} />
      <div style={{ width: '70%' }}>
        <PieChart chartData={viewData} />
      </div>
    </div>
  )
}

export default MyProductAnalysis