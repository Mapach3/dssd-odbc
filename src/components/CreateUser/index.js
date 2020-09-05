import React, {Component} from 'react'
import axios from 'axios'
import {Form, Button,Row,Col} from 'react-bootstrap'
import { __API_COUNTRIES,__API_CITIES,__API_INSERT_USER} from '../../consts/consts'

export class CreateUser extends Component{
    constructor(props){
        super(props)
        this.state = {countryList : [],
                      cityList : [],
                      message : ''
                       }

    }
    componentDidMount(){
        debugger;
        axios.get(__API_COUNTRIES).then(response => {
            var countries = response.data
            this.setState({countryList : countries})

            this.findCountryCities()


        }).catch(error => {
            console.log("Error getting countries: ")
            console.log(error)
        })



    }


    sendData(e){
        debugger;
        e.preventDefault()

        this.setState({message : ''})

        const form = e.target.form
        var name = form.elements.nombre.value
        var surname = form.elements.apellido.value
        var email = form.elements.email.value
        var store = form.elements.store.value

        var address = form.elements.address.value
        var district = form.elements.district.value
        var postCode = form.elements.postcode.value
        var phone = form.elements.phone.value

        var city = form.elements.city.value

        if (!(name == "" || surname == "" || email == "" || store == "" || store == "" || address == "" ||
            district == "" || postCode == "" || phone == "")) 
            { 
                const options = {
                    url : __API_INSERT_USER,
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data : {
                        name: name,
                        surname: surname,
                        email : email,
                        store : store,
                        address : address,
                        district : district,
                        postCode : postCode,
                        phone : phone,
                        city : city
                    }
                }

                axios(options).then(response => {
                    debugger;
                    console.log("Respuesta recibida: ")
                    console.log(response)
                    debugger;
                })


                // this.setState({message: 'El usuario se agregó correctamente!'})

            } else{
                this.setState({message : 'Por favor, complete todos los campos.'})
            }
     }


     findCountryCities(e){
         debugger;
        var url = __API_CITIES+"/"
         if (e == undefined){
             url+="1"
         }
         else{
            const form = e.target.form
            const countryId = form.elements.country.value
            url+=countryId

         }
         
         
         axios.get(url).then(response => {
             debugger;
             var cities = response.data
             this.setState({cityList : cities})
         }).catch(error =>{
             debugger;
             console.log("Error getting Cities: ",error)
         })
     }

    render(){
        return <>
            <Form>
                <p><b>Información Personal</b></p>
                <Row>
                    <Col>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control  maxlength="45" type="text" placeholder="Ingrese nombre" name="nombre"/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formSurname">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control maxlength="45" type="text" placeholder="Ingrese apellido" name="apellido" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese E-mail" name="email" />
                </Form.Group>

                <Form.Group controlId="formStore">
                    <Form.Label>Tienda</Form.Label>
                    <Form.Control as="select" name="store">
                        <option value="1">47 MySakila Drive - Alberta</option>
                        <option value="2">28 MySQL Boulevard - QLD</option>
                    </Form.Control>
                </Form.Group>

                <p><b>Ubicación</b></p>
                <Row>
                    <Col>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese Dirección" name="address" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formDistrict">
                            <Form.Label>Distrito</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese Distrito" name="district" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formPostCode">
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese Codigo Postal" name="postcode" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="number"  placeholder="Ingrese Teléfono" name="phone"/>
                        </Form.Group>
                    </Col>
                </Row>

                
                <Form.Group controlId="formCountry" >
                    <Form.Label>País</Form.Label>
                    <Form.Control as="select" onChange={(e) => this.findCountryCities(e)} name="country">
                        {this.state.countryList.map( country => 
                        <option key={country.id} value={country.id}>{country.name}</option>)
                        }
                    </Form.Control>
                </Form.Group>

            <Form.Group controlId="formCity" >
                <Form.Label>Ciudad</Form.Label>
                <Form.Control as="select" name="city">
                    {this.state.cityList.map( city => 
                    <option key={city.id} value={city.id}>{city.name}</option>)
                    }
                </Form.Control>
            </Form.Group>


                <Button variant="primary" type="submit" onClick={(e) => this.sendData(e)}>
                    Enviar
                </Button> 
            </Form>
            <p><i>{this.state.message}</i></p>
            <br />

        </>
    }


}