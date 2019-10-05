import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { setCurrentUser } from '../../actions/authActions';



export default () => {
	const 
		{ isAuthenticated, user } = useSelector(state => state.auth),
		dispatch = useDispatch()
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Nav.Link as={Link} to="/">
				<Navbar.Brand>Uptime Checker</Navbar.Brand>
			</Nav.Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto">
					{isAuthenticated ? userLinks(user, dispatch) : guestLinks()}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

const userLinks = (user, dispatch) => {
	const onClick = async () => {
		try {
			await axios.get("/api/logout")
			dispatch(setCurrentUser())
		}
		catch (err) {
			console.log(err)
		}
	}

	return (<>
		<Nav.Link as={Link} to="/account_settings">
			<Button variant="dark">{user.firstName} {user.lastName}</Button>
		</Nav.Link>
		<Nav.Link href="#">
			<Button variant="dark" onClick={onClick} > Logout</Button>
		</Nav.Link>
	</>)
}

const guestLinks = () => (
	<>
				<Nav.Link as={Link} to="/login">
					<Button variant="dark">Login</Button>
				</Nav.Link>
				<Nav.Link as={Link} to="/signup">
					<Button variant="dark">SignUp</Button>
				</Nav.Link>
	</>
)

