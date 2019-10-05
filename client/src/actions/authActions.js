import axios from 'axios'
import { SET_CURRENT_USER } from '../constants/ActionTypes'

const setCurrentUser = () => async dispatch => {
	try {
		const res = await axios.get("/api/current_user")
		dispatch({ type: SET_CURRENT_USER, payload: res.data })
	}
	catch (err) {
		dispatch({ type: SET_CURRENT_USER, payload: {}})
	}
}

export { setCurrentUser }