import React from 'react'
import { Card } from 'react-bootstrap'

const InfoCard = (props) => {
  const {title, number} = props
    return (
        <Card className="text-center">
        <Card.Body>
          <Card.Title style={{fontSize: '2rem'}}>{number}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
        </Card.Body>
      </Card>
    )
}

export default InfoCard
