import React from 'react'
import { Form } from 'react-bootstrap'

const ShowHideButton = (props) => {
    const { handleShowHideButtonOnClick, name } = props
    return (
    <Form.Group className='ml-4'>
        <Form.Label></Form.Label>
        <Form.Check type="checkbox" label={`Show Deleted ${name}`} onClick={handleShowHideButtonOnClick} />
    </Form.Group>
    )
}

export default ShowHideButton
