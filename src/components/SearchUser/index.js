import Axios from 'axios'
import React,{Component} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {Typeahead} from 'react-bootstrap-typeahead'
import axios from 'axios'
import { __API_ALL_CITIES } from '../../consts/consts'


export class SearchUser extends Component{

    state = {
        cities : [],
        chosenCity : null
    }


    componentDidMount(){

        axios.get(__API_ALL_CITIES).then( resp => {
            this.setState({cities : resp.data})
        }).catch(error => {
            console.log("Error fetching all cities SearchUser");
            console.log(error)
        })
    }

    setChosenCitiy(name){
        debugger;
        this.setState({chosenCity : name == undefined ? null : name})

    }

    // findUsers(){}


    render(){
        return <>
                <Form>
                    <p><b>Ingrese parámetros, o ninguno para traer a todos los usuarios:</b></p>
                    <Row>
                        <Col>
                            <Form.Group controlId="formName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control  maxlength="45" type="text" placeholder="Ingrese nombre" name="name"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formSurname">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control  maxlength="45" type="text" placeholder="emailejemplo@hotmail.com" name="surname"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formCity">
                                <Form.Label>Ciudad</Form.Label>    
                                    <Typeahead 
                                        id="cities"
                                        emptyLabel="Sin coincidencias." 
                                        paginationText="Mostrar más resultados..." 
                                        placeholder="Seleccione Ciudad" 
                                        options={this.state.cities.map(city => city.name)}
                                        onChange={(name) => this.setChosenCitiy(name[0])}
                                    />       
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        Buscar
                    </Button> 
                </Form>
                <br />
                </> 
                
    }


}


{/* <Typeahead 
id="countries"
emptyLabel="Sin coincidencias." 
paginationText="Mostrar más resultados..." 
placeholder="Seleccione País" 
options={this.state.countryList.map(ctry => ctry.name)}//aca va el array de countries
onChange={(name) => this.findCountryCities(name)}
/>  */}


// componentDidMount(){
//     debugger;
//     axios.get(__API_COUNTRIES).then(response => {
//         var countries = response.data
//         this.setState({countryList : countries})

//     }).catch(error => {
//         console.log("Error getting countries: ")
//         console.log(error)
//     })

// }


// findCountryCities(name){
//     debugger;
//     if (name.length != 0){
//         var url = __API_CITIES
//         const countryId = this.state.countryList.find( ctry => ctry.name == name).id
//         url+="/"+countryId
        
//         axios.get(url).then(response => {
//             debugger;
//             var cities = response.data
//             this.setState({cityList : cities})
//         }).catch(error =>{
//             debugger;
//             console.log("Error getting Cities: ",error)
//         })
//     }
//     this.setState({cityList : []})
// }
