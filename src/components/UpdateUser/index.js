import React, {Component} from 'react'
import {Form, Button,Row,Col,Table} from 'react-bootstrap'
import {__API_DELETE_USER,__API_COUNTRIES} from '../../consts/consts'
import axios from 'axios';
import {Typeahead} from 'react-bootstrap-typeahead'


export class UpdateUser extends Component{

    constructor(props){
        super(props);

        this.state = {
            countryList : [] 
        }
    }

    
    componentDidMount(){
        debugger;
        axios.get(__API_COUNTRIES).then(response => {
            var countries = response.data
            this.setState({countryList : countries})

            //this.findCountryCities()


        }).catch(error => {
            console.log("Error getting countries: ")
            console.log(error)
        })



    }

    render(){
        return <>
            <Form>
                <p><b>Test Typeahead: </b></p>
                <Row>
                    <Col>
                    <Typeahead 
                        id="countries" 
                        emptyLabel="Sin coincidencias." 
                        paginationText="Mostrar más resultados..." 
                        placeholder="Choose Country" 
                        options={this.state.countryList.map(ctry => ctry.name)} //aca va el array de countries/cities
                    /> 

                    </Col>
                </Row>
            </Form>

        </>
    }


}