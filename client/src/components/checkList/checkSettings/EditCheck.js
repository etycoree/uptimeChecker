import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { find, pull } from 'lodash'
import AceEditor from 'react-ace'
import axios from 'axios'
import 'brace/theme/github';
import 'brace/mode/json';

import { checkRequest } from '../../../actions/checkActions'

export default ({ checkId, setShowModal }) => {
	const
		dispatch = useDispatch(),
		checks = useSelector(state => state.checks.checks ? state.checks.checks : {}),
		editableCheck = find(checks, { _id: checkId }),
		[check, setCheck] = useState(editableCheck),
		[isUrlProvided, setIsUrlProvided] = useState(true)

	const updateReqBody = newReq => {
		setCheck({ ...check, reqBody: newReq})
	}

	const onChange = e => {
		setCheck({ ...check, [e.target.name]: e.target.value })
	}

	const checkboxChange = e => {
		const
			value = e.target.value,
			indexElement = check.successCodes.indexOf(value)

		if (indexElement > -1)
			setCheck({ ...check, successCodes: pull(check.successCodes, value) })
		else
			setCheck({ ...check, successCodes: [...check.successCodes, value] })
	}

	const onSubmit = async e => {
		e.preventDefault()

		if (!check.URL) {
			setIsUrlProvided(false)
			return
		}

		try {
			await axios.patch(`/api/checks/${checkId}`, check)
			dispatch(checkRequest())
			setShowModal(false)
		} catch (err) {
			console.log(err)
		}
	}


	return (
		<Form onSubmit={onSubmit}>
			<Form.Group>
				<Form.Label>Protocol</Form.Label>
				<Form.Control as="select"
					name="protocol"
					onChange={onChange}
					value={check.protocol}
				>
					<option>http</option>
					<option>https</option>
				</Form.Control>
			</Form.Group>

			<Form.Group>
				<Form.Label>Url</Form.Label>
				<Form.Control
					name="URL"
					className="form-control"
					placeholder="google.com"
					onChange={onChange}
					value={check.URL}
					isInvalid={!isUrlProvided}
				/>
				{!isUrlProvided ? <Form.Control.Feedback type="invalid">This is require</Form.Control.Feedback> : ""}
			</Form.Group>

			<Form.Group>
				<Form.Label>Success Codes</Form.Label>
				<br />
				<div className="mb-3">
					{['200', '201', '301', '302', '304'].map(code => (
						<Form.Check
							inline
							key={code}
							type="checkbox"
							checked={check.successCodes.indexOf(code) > -1}
							value={code}
							name={code}
							onChange={e => checkboxChange(e)}
							label={code}
						/>
					))}
				</div>
			</Form.Group>

			<Form.Group>
				<Form.Label>Method</Form.Label>
				<Form.Control
					as="select"
					name="method"
					value={check.method}
					onChange={onChange}
				>
					<option>GET</option>
					<option>POST</option>
					<option>PATCH</option>
					<option>DELETE</option>
				</Form.Control>
			</Form.Group>

			<Form.Group>
				<Form.Label>Timeout (seconds)</Form.Label>
				<Form.Control
					name="timeout"
					onChange={onChange}
					value={check.timeout}
					as="select"
				>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</Form.Control>
			</Form.Group>

			<Form.Group>
				<Form.Label>Request Body (optionally)</Form.Label>
				<AceEditor
					mode="json"
					theme="github"
					onChange={updateReqBody}
					value={check.reqBody}
					height="200px"
				/>
			</Form.Group>

			<hr />
			<Form.Group>
				<Button type="submit" variant="outline-dark">
						Edit Check
				</Button>
			</Form.Group>
		</Form>
	)
}