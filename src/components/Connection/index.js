import React, {Component} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import {__TEST__} from '../../consts/consts'

export class Connection extends Component{
    constructor(props){
        super(props)
        this.state = {countryList : [],
                       }

    }

    sendData(e){
        debugger;
        e.preventDefault()
        
        const form = e.target.form
        var name = form.elements.nombre.value
        var surname = form.elements.apellido.value


        const options = {
            url : __TEST__,
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
            data : {
                name: name,
                surname: surname
            }
        }

        axios(options).then(response => {
            debugger;
            console.log("Respuesta recibida: ")
            console.log(response)
            debugger;
        })
    }

    render(){
        return <>
            <Form>
                <p><b>Información Personal</b></p>
                <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre" name="nombre" />
                </Form.Group>

                <Form.Group controlId="formSurname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese apellido" name="apellido" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese E-mail" name="email" />
                </Form.Group>

                <Form.Group controlId="formStore">
                    <Form.Label>Store</Form.Label>
                    <Form.Control as="select" >
                        <option>1</option>
                        <option>2</option>
                    </Form.Control>
                </Form.Group>

                <p><b>Ubicación</b></p>

                <Form.Group controlId="formAddress">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese Dirección" name="address" />
                </Form.Group>

                <Form.Group controlId="formPostCode">
                    <Form.Label>Codigo Postal</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese Codigo Postal" name="postcode" />
                </Form.Group>

                <Form.Group controlId="formPhone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese Teléfono" name="phone" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => this.sendData(e)}>
                    Enviar
                </Button> 
            </Form>
            <br />

        </>
    }


}