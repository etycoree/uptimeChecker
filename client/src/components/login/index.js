import React from 'react'
import LoginForm from './LoginForm'
import { Row, Col, Container, Card } from 'react-bootstrap';


export default () => {
	return (
		<Container style={{ marginTop: "40px" }}>
			<Row className="justify-content-center">
				<Card>
					<Card.Img variant="top" src="img/human.svg" style={{width:"300px", height:"200px", paddingTop: "10px"}}/>
					<Card.Body>
						<Col md="auto">
							<LoginForm />
						</Col>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	)
}