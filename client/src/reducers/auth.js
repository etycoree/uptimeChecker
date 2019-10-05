import isEmpty from 'lodash/isEmpty'
import { SET_CURRENT_USER } from '../constants/ActionTypes'

const initialState = {
	isAuthenticated: false,
	user: {},
}

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			}
		
		default:
			return state
	}
}
