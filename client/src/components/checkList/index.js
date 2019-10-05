import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkRequest, deleteCheck, checkEdit } from '../../actions/checkActions'
import NewCheck from './newCheck'
import CheckSettings from './checkSettings'
import { Button, Table, Spinner } from 'react-bootstrap';

export default () => {
	const
		checks = useSelector(state => state.checks.checks),
		dispatch = useDispatch(),
		[isNewCheckModalShow, setIsNewCheckModalShow] = useState(false),
		[isSettingsModalShow, setIsSettingsModalShow] = useState(false)

	useEffect(() => {
		dispatch(checkRequest());
	}, [])
	return (
		<>
			<hr />
			<div className="text-center" style={{ marginTop: "50px", marginBottom: "30px" }}>
				<h1>DASHBOARD</h1>
				<h4>You may create up to 10 checks</h4>
			</div>
				<RenderTable
					checks={checks}
					dispatch={dispatch}
					setIsNewCheckModalShow={setIsNewCheckModalShow}
					setIsSettingsModalShow={setIsSettingsModalShow}
				/>
			{isNewCheckModalShow && <NewCheck show={isNewCheckModalShow} setShowModal={setIsNewCheckModalShow} />}
			{isSettingsModalShow && <CheckSettings show={isSettingsModalShow} setShowModal={setIsSettingsModalShow} />}
		</>
	)
}

const RenderTable = ({checks, dispatch, setIsSettingsModalShow, setIsNewCheckModalShow}) => {
	return (
		<>
			<Table striped hover>
				<thead>
					<tr>
						<th>Protocol</th>
						<th>Url</th>
						<th>Method</th>
						<th>Success Codes</th>
						<th>Timeout</th>
						<th>Current State</th>
					</tr>
				</thead>
				<tbody>{checks && renderChecks(Object.values(checks), dispatch, setIsSettingsModalShow)}</tbody>
			</Table>
			{renderButtonForNewCheck(checks, setIsNewCheckModalShow)}
		</>
	)
}

const renderButtonForNewCheck = (checks, setShowModal) => {
	if (checks && checks.length >= 10)
		return

	return (
		<Button
			onClick={() => setShowModal(true)}
			variant="outline-dark">
			Add New Check
			</Button>
	)

}

const renderChecks = (checks, dispatch, setIsSettingsModalShow) =>
	checks.map(check => {
		const { protocol, URL, successCodes, method, timeout, state } = check
		return (
			<tr
				key={check._id}
				onClick={() => onClick(check._id, dispatch, setIsSettingsModalShow)}
				style={{ cursor: "pointer" }}
			>
				<th>{protocol}</th>
				<th>{URL}</th>
				<th>{method}</th>
				<th>{`[ ${successCodes && successCodes.join(', ')} ]`}</th>
				<th>{timeout}</th>
				<th>
					{state}
					<button
						className="close"
						onClick={e => deleteOnClick(e, check._id, dispatch)}
					>
						&times;
					</button>
				</th>
			</tr>
		)
	})

const onClick = (id, dispatch, setIsSettingsModalShow) => {
	dispatch(checkEdit(id))
	setIsSettingsModalShow(true)
}

const deleteOnClick = (e, id, dispatch) => {
	e.stopPropagation()
	dispatch(deleteCheck(id))
	dispatch(checkRequest())
	renderButtonForNewCheck()
}
