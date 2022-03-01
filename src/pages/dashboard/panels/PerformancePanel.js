import React, { useEffect } from 'react'
import Donut from './Donut'
import { Col, Row } from 'react-bootstrap'
import { useDashboardData } from '../../../redux/hooks'
import { Spinner } from '../../../atoms'

const PerformancePanel = () => {
  const { branch, paymentType, paymentReason, getDashboardData } = useDashboardData()

  useEffect(() => {
    !branch.length && getDashboardData('branch');
    !paymentReason.length && getDashboardData('paymentReason');
    !paymentType.length && getDashboardData('paymentType');
  }, [branch.length, paymentReason.length,paymentType.length, getDashboardData]);
  if(branch.length === 0 || paymentReason.length === 0 || paymentType.length === 0) {
    return (<Spinner animation="border" size="sm" />)
  }
    return (
    <>
      <Row>
        <Col><Donut name={'Branch'} info={branch} /></Col>        
      </Row>
      <Row>
        <Col><Donut name={'Payment Reason'} info={paymentReason} /></Col>
      </Row>
      <Row>        
      <Col><Donut name={ 'Payment Type'} info={paymentType} /></Col>
      </Row>
      
    </>
  )
}

export default PerformancePanel
