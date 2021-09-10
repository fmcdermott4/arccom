import React from 'react';
import { useQuery } from '@apollo/client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {READ_AUDIT_TYPES} from '../utils/queries'




const CreateAudit = () => {
    const {loading, error, data} = useQuery(READ_AUDIT_TYPES);


    if(error){
        console.error(error)
    }
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return (
        <main>
            <Container>
                <Row>
                    <h1>Create Audit Page</h1>
                </Row>
                <Row>
                    <Col>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown button
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </Col>                
                </Row>
            </Container>
        </main>
    );
};

export default CreateAudit;