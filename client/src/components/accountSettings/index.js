import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container, Card, CardDeck, Image } from 'react-bootstrap';

import AccountSettingsForm from './AccountSettingsForm';
import PasswordSettingsForm from './PasswordSettingsForm'

export default () => (
	<Container style={{ marginTop: "40px"}}>
		<Link to="/">
			<Image src="/img/left-arrow.svg" style={{height: "40px"}}/>
		</Link>
		<Row className="justify-content-center">
			<CardDeck>
				<Card>
					<Card.Img variant="top" src="img/settings.svg" style={{ width: "300px", height: "200px", paddingTop: "10px" }} />
					<Card.Body>
						<Col>
							<AccountSettingsForm />
						</Col>
					</Card.Body>
				</Card>
				<Card>
					<Card.Img variant="top" src="img/password.svg" style={{ width: "300px", height: "200px", paddingTop: "10px" }} />
					<Card.Body>
						<Col>
							<PasswordSettingsForm />
						</Col>
					</Card.Body>
				</Card>
			</CardDeck>
		</Row>
	</Container>
)