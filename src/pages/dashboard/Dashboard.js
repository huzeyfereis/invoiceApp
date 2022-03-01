import React, { useEffect } from 'react';
import { InfoPanel, AllocationPanel, PerformancePanel } from './panels';
import { Container, Row, Col} from 'react-bootstrap'
import { useReceipts, useUsers, useCustomers, useAuth, useRefData } from '../../redux/hooks'

const Dashboard = () => {
  const { receipts, count, pending, getReceipts } = useReceipts()
  const { customers, getCustomers } = useCustomers()
  const { users, getUsers } = useUsers()
  const { currentBranch, groups } = useAuth();
  const { branch, getRefData } = useRefData()

  useEffect(() => {
   if(customers.length === 0) getCustomers()
  }, [customers,  getCustomers])
  useEffect(() => {
    if(!count) getReceipts(0,10)
  }, [count, receipts, getReceipts])
  useEffect(() => {
    if(users.length === 0) getUsers()
   }, [users, getUsers])
  useEffect(() => {
    if(branch.length === 0 ) getRefData('branch')
  }, [branch, getRefData])

  const infoProps = { users, count, customers, currentBranch, branch, groups }
  return (
    <Container fluid >
      <Row style={{marginBottom: '30px'}}>
        <Col>
        <Container>
          <h4>Dashboard</h4>
        </Container>
        </Col>
      </Row>      
      <Row style={{marginBottom: '30px'}}>
        <Col><InfoPanel {...infoProps} /></Col>
      </Row>
      <Row className='col-12' style={{margin: '0 0 30px 0'}}>
       <Col className='col-8' style={{paddingLeft: '0', display: 'grid', alignContent:'space-between'}}> <AllocationPanel receipts={receipts} pending={pending}/></Col>
        <Col className='col-4' style={{paddingRight: '0', display: 'grid', alignContent:'space-between', gridGap: '10px'}}><PerformancePanel /></Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
