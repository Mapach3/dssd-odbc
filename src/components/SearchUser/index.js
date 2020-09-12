import Axios from 'axios'
import React,{Component} from 'react'
import {Form, Row, Col, Button, Table} from 'react-bootstrap'
import {Typeahead} from 'react-bootstrap-typeahead'
import axios from 'axios'
import { __API_ALL_CITIES, __API_FIND_USERS } from '../../consts/consts'


export class SearchUser extends Component{

    state = {
        cities : [],
        chosenCity : 0,
        message : '',
        searchResults : []
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
        if (name == undefined){
            this.setState({chosenCity : 0 })
        }
        else{
        this.setState({chosenCity : this.state.cities.find(city => city.name == name).id })
        }

    }

    findUsers(e){
        e.preventDefault()
        
        var form = e.target.form;
        var name = form.elements.name.value
        var surname = form.elements.surname.value
        var city = this.state.chosenCity == 0 ? "" : this.state.chosenCity

        if (name.length == 0 && surname.length == 0 && city.length == 0){
            this.setState({message : 'Por favor, ingrese por lo menos un dato para la búsqueda.'})
        }
        else{
            debugger;
            const options = {
                url : __API_FIND_USERS+"?name="+name+"&surname="+surname+"&city="+city,
                method : "GET",
                headers : {
                    'Content-Type': 'application/json',
                }
            }

            axios(options).then( response => {
                var results = response.data

                if (response.data.length == 0){
                    this.setState({message : 'No hay resultados para esa búsqueda.',
                                  searchResults : []})
                }
                else{
                    this.setState({message : 'Se encontraron los siguientes resultados: ',
                                   searchResults : results})
                }
                
            })


        }
    }
    showSearchResults(searchResults){
        return <>
        <Table bordered>
            <thead>
                <tr>
                 <th>Nombre</th>
                 <th>Apellido</th>
                 <th>E-Mail</th>
                 <th>Dirección</th>
                 <th>Teléfono</th>
                 <th>Ciudad</th>
                </tr>
            </thead>
            <tbody>
                    {searchResults.map(result =>
                    <tr>
                        <td>{result.first_name}</td>
                        <td>{result.last_name}</td>
                        <td>{result.email}</td>
                        <td>{result.address}</td>
                        <td>{result.phone}</td>
                        <td>{result.city}</td>
                    </tr>
                    )}
            </tbody>
        </Table>
       </>

    }


    render(){
        return <>
                <Form>
                    <p><b>Ingrese parámetros para buscar clientes</b></p>
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
                                <Form.Control  maxlength="45" type="text" placeholder="Ingrese apellido" name="surname"/>
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
                    <Button variant="primary" type="submit" onClick={ (e) => this.findUsers(e)}>
                        Buscar
                    </Button> 
                </Form>
                {this.state.message.length == 0 ? null : this.state.message}
                {this.state.searchResults.length == 0 ? null : 
                this.showSearchResults(this.state.searchResults)
                }
                
                <br />
                </> 
                
    }


}

