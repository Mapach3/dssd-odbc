import React, {Component} from 'react'
import {Form, Button,Row,Col, Table} from 'react-bootstrap'


export class DropUser extends Component{
    
    render(){
        return <>
            <Form>
                <p><b>Escriba el E-mail de un usuario: </b></p>
                <Row>
                    <Col>
                        <Form.Group controlId="formMail">
                            <Form.Label>E-mail del usuario</Form.Label>
                            <Form.Control  maxlength="45" type="text" placeholder="emailejemplo@hotmail.com" name="nombre"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" maxlength="50" placeholder="Ingrese e-mail" name="email" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formStore">
                        <Form.Label>Tienda</Form.Label>
                        <Form.Control as="select" name="store">
                            <option value="1">47 MySakila Drive - Alberta</option>
                            <option value="2">28 MySQL Boulevard - QLD</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>



                <Button variant="primary" type="submit">
                    Enviar
                </Button> 
            </Form>
            <br />

        </>
    }


}