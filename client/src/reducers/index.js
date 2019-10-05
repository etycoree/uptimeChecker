import { combineReducers } from 'redux'
import auth from './auth'
import checks from './checkList'

export default combineReducers({
	auth,
	checks,
})