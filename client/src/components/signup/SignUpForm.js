import React, { useState } from 'react'
import useForm from 'react-hook-form'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';

import { checkFieldError } from './utils'

const SignUpForm = ({ history }) => {
	const
		{ register, handleSubmit, errors } = useForm(),
		[alreadyExistMsg, setAlreadyExistMsg] = useState('')

	const onSubmit = async data => {
		try {
			await axios.post("/api/signup", data)
			history.push("/login")
		}
		catch (err) {
			console.log(err.response)
			setAlreadyExistMsg(err.response.data.error)
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group>
				<Form.Label>First Name</Form.Label>
				<Form.Control
					name="firstName"
					ref={register({ required: true, minLength: 2 })}
					isInvalid={errors.firstName}
				/>
				{checkFieldError(errors.firstName, "required", "This is required")}
				{checkFieldError(errors.firstName, "minLength", "This field is required min length of 2")}
			</Form.Group>

			<Form.Group>
				<Form.Label>Last Name</Form.Label>
				<Form.Control
					name="lastName"
					ref={register({ required: true, minLength: 2 })}
					isInvalid={errors.lastName}
				/>
				{checkFieldError(errors.lastName, "required", "This is required")}
				{checkFieldError(errors.lastName, "minLength", "This field is required min length of 2")}
			</Form.Group>

			<Form.Group>
				<Form.Label>Phone Number</Form.Label>
				<Form.Control
					name="phoneNumber"
					ref={register({ required: true, minLength: 10, maxLength: 10 })}
					onChange={() => setAlreadyExistMsg('')}
					isInvalid={errors.phoneNumber || alreadyExistMsg}
				/>
				{checkFieldError(errors.phoneNumber, "required", "This is required")}
				{checkFieldError(errors.phoneNumber, "minLength", "This field is required length of 10")}
				{alreadyExistMsg && <Form.Control.Feedback type="invalid">
					User with this phone already exist
				</Form.Control.Feedback>}
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control
					name="password"
					type="password"
					ref={register({ required: true, minLength: 4 })}
					isInvalid={errors.password}
				/>
				{checkFieldError(errors.password, "required", "This is required")}
				{checkFieldError(errors.password, "minLength", "This field is required min length of 4")}
			</Form.Group>

			<Form.Group>
				<Button type="submit">Sign Up</Button>
			</Form.Group>
		</Form>
	)
}

export default withRouter(SignUpForm)