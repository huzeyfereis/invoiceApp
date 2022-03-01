import React from 'react'
import Chart from 'react-apexcharts'
import { Card } from 'react-bootstrap'

const Donut = (props) => {
    const { info, name } = props
    let labels = ['serie1']
    let series = [0]
    
    if(info.length >= 1) {
        labels = info.map(e => e._id.id.name)
        series = info.map(e => e.count)
    }

    const data = {
        options: {
            dataLabels: {
                enabled: false
            },
            labels: labels,
            chart: {
                type: 'donut',
            },
            responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%',
                },
                legend: {
                position: 'bottom'
                }
            }
            }]

        },
        series: series,
      }
    
    return (
        <Card >
            <Card.Header>
                {name}
            </Card.Header>
            <div className="donut">
                <Chart options={data.options} series={data.series} type="donut" />
            </div>
        </Card>
    )
}

export default Donut
