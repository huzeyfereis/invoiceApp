import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import InfoCard from './InfoCard' 

const InfoPanel = (props) => {
  const { users, count, customers, currentBranch, branch, groups } = props
  return (
    <Container >
      <Row>
      <Col xs="3"><InfoCard title={'Branch'} number={groups.includes('Admin')  ? branch.length : currentBranch}/></Col>
      <Col xs="3"><InfoCard title={'Managers'} number={users.length || 0} /></Col>
      <Col xs="3"><InfoCard title={'Customers'} number={customers.length || 0} /></Col>
      <Col xs="3"><InfoCard title={'Receipts'} number={count || 0} /></Col>
      </Row>
    </Container >
  )
}

export default InfoPanel
