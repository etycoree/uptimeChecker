import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import SignUp from './signup'
import Login from './login'
import Header from './header'
import CheckList from './checkList'
import Auth from './hoc/Auth'
import AccountSettings from './accountSettings';
import { checkRequest } from '../actions/checkActions'


export default () => {
	const
		dispatch = useDispatch()

	useEffect(() => {
		setInterval(dispatch.bind(null, checkRequest()), 1000 * 30)
	}, [])

	return (
		<Container>
			<BrowserRouter>
				<Header />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/login" component={Login} />
				<Auth exact path="/" component={CheckList} />
				<Auth exact path="/account_settings" component={AccountSettings} />
			</BrowserRouter>
		</Container>
	)
}
