import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Alert } from 'react-bootstrap';
import useForm from 'react-hook-form'

import { checkFieldError } from '../signup/utils'
import { setCurrentUser } from '../../actions/authActions';

export default () => {
	const
		{ user } = useSelector(state => state.auth),
		dispatch = useDispatch(),
		[ isAlreadyExistMsg, setIsAlreadyExistMsg ] = useState(false),
		[ isAlertShow, setIsAlertShow ] = useState(false),
		{ register, handleSubmit, errors } = useForm({
			defaultValues: {
				phoneNumber: user.phoneNumber,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		})

	const onSubmit = async data => {
		data._id = user._id
		try {
			setIsAlreadyExistMsg(false)
			await axios.patch("/api/user", data)
			setIsAlertShow(true)
			setTimeout(() => setIsAlertShow(false), 4000)
			dispatch(setCurrentUser())
		} catch (err) {
			setIsAlreadyExistMsg(true)
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
					<Form.Label>First Name</Form.Label>
					<Form.Control
						name="firstName"
						ref={register({ required: true, minLength: 2 })}
						isInvalid={errors.firstName}
					/>
					{checkFieldError(errors.firstName, "required", "This is required")}
					{checkFieldError(errors.firstName, "minLength", "This field is required length of 2")}
				</Form.Group>

				<Form.Group>
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						name="lastName"
						ref={register({ required: true, minLength: 2 })}
						isInvalid={errors.lastName}
					/>
					{checkFieldError(errors.lastName, "required", "This is required")}
					{checkFieldError(errors.lastName, "minLength", "This field is required length of 2")}
				</Form.Group>
				<Form.Group>
					<Button type="submit">Update</Button>
				</Form.Group>
			</Form>
			{isAlertShow && <Alert variant="success">
				User data has been changed
			</Alert>}
			{isAlreadyExistMsg && <Alert variant="danger">
				User with this phone already exist
			</Alert>}
		</>
	)
}