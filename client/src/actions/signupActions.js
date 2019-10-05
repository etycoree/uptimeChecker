import axios from 'axios'
import { SET_CURRENT_USER } from '../constants/ActionTypes'

export const signUp = user => async dispatch => {
	try {
		const res = await axios.post('/api/signup', user)
		console.log(res)
		dispatch({ type: SET_CURRENT_USER, payload: res.data })
	}
	catch (err) {
		dispatch({ type: SET_CURRENT_USER, payload: {} })
	}
}
