import React, { useState, useEffect } from 'react'
import axios from 'axios';
import useForm from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap';

import { setCurrentUser } from '../../actions/authActions'
import { checkFieldError } from '../signup/utils'

const LoginForm = ({ history }) => {
	const
		[badCred, setBadCred] = useState(''),
		dispatch = useDispatch(),
		{ isAuthenticated } = useSelector(state => state.auth),
		{ register, handleSubmit, errors } = useForm()

	useEffect(() => {
		if (isAuthenticated)
			history.push('/')
	})

	const onSubmit = async data => {
		try {
			await axios.post("/api/login", data)
			dispatch(setCurrentUser())
		}
		catch (err) {
			setBadCred("phone number or password are invalid")
		}
	}

	return (
		<>
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group>
				<Form.Label>Phone Number</Form.Label>
				<Form.Control
					name="phoneNumber"
					ref={register({ required: true, minLength: 10, maxLength: 10 })}
					isInvalid={errors.phoneNumber}
				/>
				{checkFieldError(errors.phoneNumber, "required", "This is required")}
				{checkFieldError(errors.phoneNumber, "minLength", "This field is required length of 10")}
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control
					name="password"
					type="password"
					ref={register({ required: true })}
					isInvalid={errors.password}
				/>
				{checkFieldError(errors.password, "required", "This is required")}
			</Form.Group>
			{badCred ? <Form.Control.Feedback type="invalid">{badCred}</Form.Control.Feedback> : ''}
			<Form.Group>
				<Button type="submit">Login</Button>
			</Form.Group>
		</Form>
			{badCred ? <Alert variant="danger" onClose={() => setBadCred('')} dismissible>
				Bad Credentials
			</Alert> : ''}
			</>
	)
}

export default withRouter(LoginForm)