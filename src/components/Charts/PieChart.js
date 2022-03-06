import React from 'react'
// eslint-disable-next-line
import { Chart as ChartJS } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

const PieChart = ({chartData}) => {
  return (
    <Pie data={chartData} />
  )
}

export default PieChart