import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap'
import {CreateUser} from '../CreateUser/index'
import './style.css'

export function Navigation() {

    return (
        <Container className="containerStyle">
            <Row className="justify-content-md-center">
                <Col>
                    <h2>Desarrollo de Software en Sistemas Distribuidos</h2>
                    <h2>Práctica 2: ODBC</h2>
                </Col>
            </Row>
            
            <Row className="formsRow">
            <Col xs={3} className="actColumn">
                <p><i>Insertar Usuario</i></p>
                <CreateUser />
            </Col>
            <Col xs={3} className="actColumn secondColumn">2 of 4</Col>
            <Col lg={3} className="actColumn secondColumn">3 of 4</Col> 
            <Col lg={3} className="actColumn secondColumn">4 of 4</Col>

            </Row>
        </Container>
    )

}