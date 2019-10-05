import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Modal, ModalBody, ModalTitle, Form, Button } from 'react-bootstrap'
import { pull } from 'lodash'
import AceEditor from 'react-ace'
import 'brace/theme/github';
import 'brace/mode/json';

import { checkRequest } from '../../../actions/checkActions';

export default ({ show, setShowModal }) => {
	const
		dispatch = useDispatch(),
		user = useSelector(state => state.auth.user),
		defaultCheck = {
			protocol: "http",
			URL: "",
			successCodes: ["200"],
			method: "GET",
			timeout: "1",
			reqBody: "{}",
			_creator: user._id,
		},
		[check, setCheck] = useState(defaultCheck),
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
		if (!check.reqBody)
			setCheck({ ...check, reqBody: "{}" })
		try {
			await axios.post("/api/newCheck", check)
			dispatch(checkRequest())
			setShowModal(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Modal
			show={show}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={() => setShowModal(false)}
		>
			<Form onSubmit={onSubmit}>
				<Modal.Header>
					<ModalTitle>Check Options</ModalTitle>
				</Modal.Header>
				<ModalBody>
					<Form.Group>
						<Form.Label>Protocol</Form.Label>
						<Form.Control
							as="select"
							name="protocol"
							onChange={onChange}
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
									defaultChecked={code === '200'}
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
							width="450px"
						/>
					</Form.Group>

					<hr />
					<Form.Group>
						<Button type="submit" variant="outline-dark">
							Create New Check
						</Button>
					</Form.Group>
				</ModalBody>
			</Form>
		</Modal>
	)
}
