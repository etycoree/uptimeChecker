import React from 'react'
import { Form } from 'react-bootstrap';

export const checkFieldError = (error, type, errMsg) => (
		error && error.type === type && (
			<Form.Control.Feedback type="invalid">{errMsg}</Form.Control.Feedback>
		)
)