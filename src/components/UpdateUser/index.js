import React, {Component} from 'react'
import {Form, Button,Row,Col,Table} from 'react-bootstrap'
import {__API_COUNTRIES,__API_CITIES, __API_GET_USER, __API_UPDATE_USER,__API_STORES} from '../../consts/consts'
import axios from 'axios';


export class UpdateUser extends Component{

    constructor(props){
        super(props);

        this.state = {
            countryList : [],
            cityList : [],
            userFound : false,
            userId : 0,
            userAddressId : 0,
            message : '',
            userUpdated : {}
        }

    }
    
    componentDidMount(){
        debugger;
        axios.get(__API_COUNTRIES)
        axios.get(__API_STORES)

        axios.all([
            axios.get(__API_COUNTRIES),
            axios.get(__API_STORES)

        ]).then(axios.spread((countries, stores) => {
            var ctries = countries.data
            var strs = stores.data
            
            this.setState({countryList : ctries,
                           storeList : strs })                          


        })).catch(error => {
            console.log("Error getting Countries or Stores in ComponentDidMount() UpdateUser: ")
            console.log(error)
        })

    }

     findCountryCities(form,cityId=0){
        debugger;
        var url = __API_CITIES+"/"
        const countryId = form.elements.country.value
        
        url+=countryId

        axios.get(url).then(response => {
            debugger;
            
            var cities = response.data
            
            this.setState({cityList : cities})
            
            if (cityId != 0){
                form.elements.city.value = cityId
            }
            
        }).catch(error =>{
            debugger;
            console.log("Error getting Cities: ",error)
        })
    }

    findUserForUpdate(e) {
        
        //Put the state back in case it's not the first time a customer is searched.
        this.setState({userUpdated : {}, userFound : false, message : ''})

        e.preventDefault()
        const form = e.target.form

        var email = form.elements.updateEmail.value

        if (email == "" || !email.includes("@")){
            this.setState({message : "Por favor, ingrese un E-mail válido."})
        }
        else{
            debugger
            const options = {
                url :  __API_GET_USER+"?userEmail="+email,
                method : 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            axios(options).then( resp => {
                debugger;
                var userInfo = resp.data[0]
                if (userInfo == undefined) {
                    this.setState({message:"ERROR: No se encontró ningun usuario con ese E-mail."})
                }else{
                    this.setState({message:'',
                                   userFound : true})
                    
                    var form = document.getElementById('newUserForm')
                    var formElements = form.elements
                     debugger;

                    //set form values based on what was returned from the server.
                    formElements.nombre.value = userInfo.first_name
                    formElements.apellido.value = userInfo.last_name
                    formElements.email.value = userInfo.email
                    formElements.store.value = userInfo.store_id

                    formElements.address.value = userInfo.address
                    formElements.district.value = userInfo.district
                    formElements.country.value = this.state.countryList.find( ctry => ctry.id == userInfo.country_id).id
                    this.findCountryCities(form,userInfo.city_id)
                    
                    formElements.phone.value = userInfo.phone
                    formElements.postcode.value = userInfo.postal_code

                    this.setState({userId : userInfo.customer_id,
                                    userAddressId : userInfo.address_id})      

                    
                }
            })
        }
    }

    showUpdatedUserData(){
       const user = this.state.userUpdated
       return <>
               <Table bordered>
                   <thead>
                       <tr>
                       <th>ID</th>
                       <th>Nuevo Nombre</th>
                       <th>Nuevo Apellido</th>
                       <th>Nuevo E-Mail</th>
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

    updateUser(e) {
        debugger;
        e.preventDefault()

        var form = e.target.form
        var name = form.elements.nombre.value
        var surname = form.elements.apellido.value
        var email = form.elements.email.value
        var store = form.elements.store.value

        var address = form.elements.address.value
        var district = form.elements.district.value
        var postcode = form.elements.postcode.value
        var phone = form.elements.phone.value

        var userId = this.state.userId
        var addressId = this.state.userAddressId

        var city = form.elements.city.value

        if (!(name == "" || surname == "" || email == "" || store == "" || store == "" || address == "" ||
        district == "" || postcode == "" || phone == "")) 
        { 
            const options = {
                url : __API_UPDATE_USER,
                method : 'PUT',
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
                    postCode : postcode,
                    phone : phone,
                    city : city,
                    addressId: addressId,
                    userId : userId
                }
            }

            axios(options).then(response => {
                console.log("Respuesta recibida: ")
                console.log(response)
                debugger;
                this.setState({userUpdated : response.data[0],
                               userFound : false,
                               message: 'Se actualizó correctamente el usuario. Para actualizar, utilice el Nuevo E-Mail: '})

            })  

        } else{
            this.setState({message : 'Por favor, complete todos los campos.'})
        }
 }



    render(){
        return <>
            <Form>
                <p><b>Escriba el E-mail de un usuario: </b></p>
                <Row>
                    <Col>
                        <Form.Group controlId="formMail">
                            <Form.Control  maxlength="50" type="email" placeholder="emailejemplo@hotmail.com" name="updateEmail"/>
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
             <Form id="newUserForm">
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
                          {this.state.storeList.map( store => 
                          <option key={store.store_id} value={store.store_id}>{store.address} - {store.city}</option>
                          )}
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
                            <Form.Control as="select" name="country" onChange= { (e) => this.findCountryCities(e.target.form)}>
                                {this.state.countryList.map( ctry => 
                                <option key={ctry.id} value={ctry.id}>{ctry.name}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCity" >
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control as="select" name="city">
                                {this.state.cityList.map( city => 
                                <option key={city.id} value={city.id}>{city.name}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" onClick={(e) => this.updateUser(e)}>
                    Actualizar
                </Button>


            </Form>}

            
            {Object.keys(this.state.userUpdated).length != 0 ? 
                this.showUpdatedUserData() : null}

        </>
    }

}
