import React from 'react';
import {Container, Row, Col,Tabs,Tab} from 'react-bootstrap'
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
                
                    <Tabs defaultActiveKey="insert">
                        <Tab eventKey="insert" title="Insertar Usuario" className="centerTabContent">
                            <Col className="actColumn justify-content-md-center">
                                <CreateUser />
                            </Col>
                        </Tab>

                        <Tab eventKey="remove" title="Baja de Usuario">
                        </Tab>

                        <Tab eventKey="update" title="Actualizar Usuario" disabled>
                        </Tab>

                        <Tab eventKey="search" title="Búsqueda de Usuario" disabled>
                        </Tab>
                    </Tabs>
                    
                    {/* <Col xs={3} className="actColumn">
                        <p><i>Insertar Usuario</i></p>
                        <CreateUser />
                    </Col>
                    <Col xs={3} className="actColumn secondColumn">2 of 4</Col>
                    <Col lg={3} className="actColumn secondColumn">3 of 4</Col> 
                    <Col lg={3} className="actColumn secondColumn">4 of 4</Col> */}
            </Container>
    )

}