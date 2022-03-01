import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { Button } from '.'

const ConfirmationModal = (props) => {
    const { onClick, modalHeading, variant = 'info' } = props
    return (
        <Card>
        <Card.Body>
            <Card.Text>Do you want to continue?</Card.Text>
            <Row className="d-flex justify-content-end align-items-center mt-1">
            <Button 
                text={modalHeading}
                variant={variant}
                className="ml-auto"
                type='button'
                onClick= {onClick}
            />
            </Row>
        </Card.Body>
        </Card>
    )
}

export default ConfirmationModal
