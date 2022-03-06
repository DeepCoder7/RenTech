import React from 'react'
// eslint-disable-next-line
import {Chart as chartJS} from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

const DoughnutChart = ({chartData}) => {
    return (
        <div style={{ width: 400 }}>
            <Doughnut data={chartData} />
        </div>
    )
}

export default DoughnutChart