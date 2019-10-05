import {omit, findKey} from 'lodash'
import { ADD_CHECKS, DELETE_CHECK, EDIT_CHECK } from '../constants/ActionTypes';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case ADD_CHECKS:
			return { ...state, checks: action.checks }

		case DELETE_CHECK:
			const index = findKey(state.checks, { _id: action.id })
			return { ...state, checks: omit(state.checks, [index]) }

		case EDIT_CHECK:
			return { ...state, editCheck: action.id || ""}

		default:
			return state
	}
}