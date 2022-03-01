import React, { useEffect } from 'react'
import LineChart from './LineChart'
import { Row, Col } from 'react-bootstrap'
import { FlexTable } from '../../../atoms'
import { useDashboardData } from '../../../redux/hooks'

const AllocationPanel = (props) => {
  const { receipts, pending } = props
  const {date, getDashboardData } = useDashboardData()
  const title = [
    {
      title: '# ',
      fieldName: 'id',
      className: 'col-xs-2'
    },
  
    {
      title: 'Customer',
      fieldName: 'customer',
      className: 'col-xs-2'
    },
    {
      title: 'Amount (£)',
      fieldName: 'amount',
      className: 'col-xs-2'
    }
  ];
  
  useEffect(() => {
    !date.length && getDashboardData('date');
  }, [date.length, getDashboardData]);

  return (
    <>
    <Row>
      <Col><LineChart recData={date} /></Col>
    </Row>
    <Row>
      <Col>
        <FlexTable 
          tableType="receipt"
          data={receipts.length ? receipts.slice(0,10)  : []}
          titleData={title}
          // iconClick={(e, icon, id) => handleClick(e, icon, id)}
          tableId={'dashboard-list-flex-table'}
          pending={pending}
        />
      </Col>
    </Row>
  </>
  )
}

export default AllocationPanel
