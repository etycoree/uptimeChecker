import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Tabs, Tab } from 'react-bootstrap';

import EditCheck from './EditCheck'
import RequestDetails from './RequestDetails'
import ResponseDetails from './ResponseDetails'

export default ({ show, setShowModal }) => {
	const
		[key, setKey] = useState("editCheck"),
		checkId = useSelector(state => state.checks.editCheck)

	return (
		<Modal
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={() => setShowModal(false)}
		>
			<Modal.Header>
				<Modal.Title>Detailed View</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Tabs activeKey={key} onSelect={k => setKey(k)} style={{marginBottom: "20px"}}>
					<Tab eventKey="editCheck" title="Edit Check">
						<EditCheck checkId={checkId} setShowModal={setShowModal} />
					</Tab>
					<Tab eventKey="requestDetails" title="Request Details">
						<RequestDetails checkId={checkId} />
					</Tab>
					<Tab eventKey="responseDetails" title="Response Details">
						<ResponseDetails checkId={checkId} />
					</Tab>
				</Tabs>
			</Modal.Body>
		</Modal>
	)
}