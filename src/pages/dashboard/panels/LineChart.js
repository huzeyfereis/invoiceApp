import React from 'react'
import Chart from 'react-apexcharts'
import { Card } from 'react-bootstrap'
import moment from 'moment'

const LineChart = ({recData}) => {
  const amount = []
  const count = []
  const date = []
  recData.map(e => {
    if(e) {
     amount.push(e.totalPrice.toFixed(2))
     count.push(e.count)
     date.push(moment(e.date[0]).format('L'))
    }
    return e
  })

    const data = {          
        series: [{
            name: "Total amount",
            data: amount
        }, {
          name: "Number of Receipts",
          data:count
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            type:'datetime',
            categories: date,
          }
        },
      
      
      };    

    return (
        <Card>
            <Card.Header>Monthly Receipt Activity</Card.Header>
            <Chart options={data.options} series={data.series} type="line" height={250}/>
        </Card>
    )
}

export default LineChart
