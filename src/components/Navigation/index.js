import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap'
import {Connection} from '../Connection/index'
import './style.css'

export function Navigation() {

    return (
        <Container className="containerStyle">
            <Row className="justify-content-md-center">
                <Col>
                    <h2>Desarrollo de Software en Sistemas Distribuidos</h2>
                    <h2>Práctica 2: ODBC</h2>
                    {/* <Button>Alta de Usuario</Button>{' '}<Button>Modificación de Usuario</Button> <Button>Baja de Usuario</Button> */}
                </Col>
            </Row>
            
            <Row className="formsRow">
            <Col xs={2} className="actColumn">
                <p><i>Insertar Usuario</i></p>
                <Connection />
            </Col>
            <Col xs={1}></Col>
            <Col xs={2} className="actColumn secondColumn">2 of 4</Col>
            <Col xs={1}></Col>
            <Col lg={2} className="actColumn secondColumn">3 of 4</Col> 
            <Col xs={1}></Col>
            <Col lg={2} className="actColumn secondColumn">4 of 4</Col>

            </Row>
        </Container>
    )

}