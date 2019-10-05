import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import NewCheckForm from './NewCheckForm'
import { checkRequest } from '../../../actions/checkActions'

const NewCheck = ({ history, show, setShowModal }) => {
	const
		dispatch = useDispatch(),
		checks = useSelector(state => state.checks)

	useEffect(() => {
		// (() => dispatch(checkRequest()))()
		dispatch(checkRequest())

		if (Object.values(checks) >= 10)
			history.push("/")
	}, [])

	return (
		<NewCheckForm show={show} setShowModal={setShowModal} />
	)
}

export default withRouter(NewCheck)