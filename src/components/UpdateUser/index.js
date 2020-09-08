import React, {Component} from 'react'
import {Form, Button,Row,Col} from 'react-bootstrap'
import {__API_COUNTRIES,__API_CITIES} from '../../consts/consts'
import axios from 'axios';
import {Typeahead} from 'react-bootstrap-typeahead'


export class UpdateUser extends Component{

    constructor(props){
        super(props);

        this.state = {
            countryList : [],
            cityList : [],
            userFound : false,
            message : ''
        }
    }
    
    componentDidMount(){
        debugger;
        axios.get(__API_COUNTRIES).then(response => {
            var countries = response.data
            this.setState({countryList : countries})

        }).catch(error => {
            console.log("Error getting countries: ")
            console.log(error)
        })

    }

    findCountryCities(name){
        debugger;
        if (name.length != 0){
            var url = __API_CITIES
            const countryId = this.state.countryList.find( ctry => ctry.name == name).id
            url+="/"+countryId
            
            axios.get(url).then(response => {
                debugger;
                var cities = response.data
                this.setState({cityList : cities})
            }).catch(error =>{
                debugger;
                console.log("Error getting Cities: ",error)
            })
        }
        this.setState({cityList : []})
    }

    findUserForUpdate(e) {
        
        e.preventDefault()
        const form = e.target.form

        var email = form.elements.updateEmail.value

        if (email == "" || !email.includes("@")){
            this.setState({message : "Por favor, ingrese un E-mail válido."})
        }
        else{
            this.setState({userFound : true})
            this.setState({message : ''})

            // const options = {
            //     url : __API_DELETE_USER,
            //     method : 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     data : {
            //         email: email,
            //     }
            // }

            // axios(options).then( resp => {
            //     debugger;
            //     var deletedUser = resp.data[0]
            //     if (deletedUser == undefined) {
            //         this.setState({message:"ERROR: No se encontró ningun usuario con ese E-mail."})
            //     }else{
            //         this.setState({message:"El siguiente usuario fue dado de baja: ",
            //                        deletedUser : deletedUser})
            //     }
            // })
        }
    }

    render(){
        return <>
            <Form>
                <p><b>Escriba el E-mail de un usuario: </b></p>
                <Row>
                    <Col>
                        <Form.Group controlId="formMail">
                            <Form.Control  maxlength="50" type="text" placeholder="emailejemplo@hotmail.com" name="updateEmail"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" onClick={(e) => this.findUserForUpdate(e)}>
                    Buscar Usuario
                </Button> 
            </Form>
            <br />
            {this.state.message.length == 0 ? null : 
            this.state.message}

            {!this.state.userFound ? null : 
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

                <p><b>Información de Contacto</b></p>
                <Row>
                    <Col>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese dirección" name="address" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formDistrict">
                            <Form.Label>Distrito</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese distrito" name="district" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formPostCode">
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control type="text" maxlength="10" placeholder="Ingrese código postal" name="postcode" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" maxlength="20" placeholder="Ingrese teléfono" name="phone"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formCountry" >
                            <Form.Label>País</Form.Label>
                                <Typeahead 
                                id="countries" 
                                emptyLabel="Sin coincidencias." 
                                paginationText="Mostrar más resultados..." 
                                placeholder="Seleccione País" 
                                options={this.state.countryList.map(ctry => ctry.name)}//aca va el array de countries
                                onChange={(name) => this.findCountryCities(name)}
                                /> 
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCity" >
                            <Form.Label>Ciudad</Form.Label>
                            <Typeahead 
                                id="cities" 
                                emptyLabel="Sin coincidencias." 
                                paginationText="Mostrar más resultados..." 
                                placeholder="Seleccione Ciudad" 
                                options={this.state.cityList.map(city => city.name)} //aca va el array de cities
                                /> 
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" >
                    Enviar
                </Button> 
            </Form>}

        </>
    }

}
