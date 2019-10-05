import axios from 'axios'

import { ADD_CHECKS, EDIT_CHECK, DELETE_CHECK } from '../constants/ActionTypes'

export const checkRequest = () => async dispatch => {
	try {
		const res = await axios.get("/api/checks")
		dispatch({ type: ADD_CHECKS, checks: res.data })
	} catch (err) {
		dispatch({ type: ADD_CHECKS, checks: {} })
	}
}

export const deleteCheck = id => async dispatch => {
	try {
		await axios.delete(`/api/checks/${id}`)
		dispatch({ type: DELETE_CHECK, id })
	} catch (err) {
		console.log(err)
	}
}

export const checkEdit = id => dispatch => dispatch({ type: EDIT_CHECK, id })