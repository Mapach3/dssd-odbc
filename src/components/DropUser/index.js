import React, {Component} from 'react'
import {Form, Button,Row,Col,Table} from 'react-bootstrap'
import {__API_DELETE_USER} from '../../consts/consts'
import axios from 'axios';


export class DropUser extends Component{

    constructor(props){
        super(props);

        this.state = {
            message : '',
            deletedUser : {}
        }
    }

    deleteUser(e){
        e.preventDefault()

        const form = e.target.form

        var email = form.elements.userEmail.value

        if (email == "" || !email.includes("@")){
            this.setState({message : "Por favor, ingrese un E-mail válido."})
        }
        else{
            this.setState({message : ""})

            const options = {
                url : __API_DELETE_USER,
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data : {
                    email: email,
                }
            }

            axios(options).then( resp => {
                debugger;
                var deletedUser = resp.data[0]
                if (deletedUser == undefined) {
                    this.setState({message:"ERROR: No se encontró ningun cliente con ese E-mail."})
                }else{
                    this.setState({message:"El siguiente cliente fue dado de baja: ",
                                   deletedUser : deletedUser})
                }
            })
        }
    }

    showDeletedUserData(){
        const user = this.state.deletedUser
       return <>
               <Table bordered>
                   <thead>
                       <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>E-Mail</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                        <td>{user.customer_id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                       </tr>
                   </tbody>
               </Table>
              </>
    }

    
    render(){
        return <>
            <Form>
                <p><b>Escriba el E-mail de un cliente: </b></p>
                <Row>
                    <Col>
                        <Form.Group controlId="formMail">
                            <Form.Control  maxlength="50" type="text" placeholder="emailejemplo@hotmail.com" name="userEmail"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" onClick={(e) => this.deleteUser(e)}>
                    Eliminar Cliente
                </Button> 
            </Form>
            <p><i>{this.state.message}</i></p>
            {Object.keys(this.state.deletedUser).length != 0 ? 
            this.showDeletedUserData() : null}
            <br />
        </>
    }


}