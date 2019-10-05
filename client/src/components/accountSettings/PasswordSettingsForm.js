import React, { useState } from 'react'
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import useForm from 'react-hook-form'

import { checkFieldError } from '../signup/utils'

export default () => {
	const
		{ register, handleSubmit, errors } = useForm(),
		[ isPasswordMatch, setIsPasswordMatch ] = useState(true),
		[ isAlertShow, setIsAlertShow ] = useState(false)

	const onSubmit = async data => {
		try {
			setIsPasswordMatch(true)
			await axios.patch("/api/user_password", data)
			setIsAlertShow(true)
			setTimeout(() => setIsAlertShow(false), 4000)
		} catch (err) {
			setIsPasswordMatch(false)
			console.log(err)
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group>
					<Form.Label>Last Password</Form.Label>
					<Form.Control
						name="lastPassword"
						type="password"
						ref={register({ required: true, minLength: 4})}
						isInvalid={errors.lastPassword}
					/>
					{checkFieldError(errors.lastPassword, "required", "This is required")}
					{checkFieldError(errors.lastPassword, "minLength", "This field is required length of 4")}
				</Form.Group>

				<Form.Group>
					<Form.Label>New Password</Form.Label>
					<Form.Control
						name="newPassword"
						type="password"
						ref={register({ required: true, minLength: 4 })}
						isInvalid={errors.newPassword}
					/>
					{checkFieldError(errors.newPassword, "required", "This is required")}
					{checkFieldError(errors.newPassword, "minLength", "This field is required length of 4")}
				</Form.Group>
				<Form.Group>
					<Button type="submit">Change Password</Button>
				</Form.Group>
			</Form>
			{isAlertShow && <Alert variant="success" transition="fade">
				Password has been changed
			</Alert>}
			{!isPasswordMatch && <Alert variant="danger" transition="fade">
				Password didn't match
			</Alert>}
		</>
	)
}
