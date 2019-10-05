import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { setCurrentUser } from '../../actions/authActions'

export default ({component: Component, ...props}) => {
	const
		dispatch = useDispatch(),
		{ isAuthenticated } = useSelector(state => state.auth)

	useEffect(() => {
		dispatch(setCurrentUser())
	}, [])

	return (
		<Route 
			{...props}
			render={props =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	)
}
