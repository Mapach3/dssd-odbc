import React from 'react';
import {Container, Row, Col,Tabs,Tab} from 'react-bootstrap'
import {CreateUser} from '../CreateUser/index'
import {DropUser} from '../DropUser/index'
import {UpdateUser} from '../UpdateUser/index'
import './style.css'

export class Navigation extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            // Takes active tab from props if it is defined there
            activeTab: props.activeTab || "insert"
          };
    }

    handleSelect = (selectedTab) => {
        this.setState({
            activeTab: selectedTab
          });
    }
    

    render(){
        return (    <Container className="containerStyle">
                <Row className="justify-content-md-center">
                    <Col>
                        <h2>Desarrollo de Software en Sistemas Distribuidos</h2>
                        <h2>Práctica 2: ODBC</h2>
                    </Col>
                </Row>
                
                    <Tabs defaultActiveKey="insert" id="uncontrolled-tab-example" onSelect={this.handleSelect}>
                        <Tab eventKey="insert" title="Alta de Usuario" className="centerTabContent">
                            <Col className="actColumn justify-content-md-center">
                                <CreateUser />
                            </Col>
                        </Tab>

                        <Tab eventKey="remove" title="Baja de Usuario" className="centerTabContent">
                            <Col className="actColumn justify-content-md-center">
                                <DropUser />
                            </Col>
                        </Tab>

                        <Tab eventKey="update" title="Actualizar Usuario" className="centerTabContent">
                            <Col className="actColumn justify-content-md-center">
                                <UpdateUser />
                            </Col>
                            
                        </Tab>

                        <Tab eventKey="search" title="Búsqueda de Usuario" disabled className="centerTabContent">
                        </Tab>
                    </Tabs>
    </Container>)
}

}