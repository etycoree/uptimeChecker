import React from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap';

import SignUpForm from './SignUpForm'


export default () => {
	return (
		<Container style={{ marginTop: "40px" }}>
			<Row className="justify-content-center">
				<Card>
					<Card.Img variant="top" src="img/humanAdd.svg" style={{width:"300px", height:"200px", paddingTop: "10px"}}/>
					<Card.Body>
						<Col md="auto">
							<SignUpForm />
						</Col>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	)
}
