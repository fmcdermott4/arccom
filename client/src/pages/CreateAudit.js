import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {READ_AUDIT_TYPES} from '../utils/queries'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'



const CreateAudit = () => {
    const {loading, error, data} = useQuery(READ_AUDIT_TYPES);


    const [auditType, setAuditType] = useState("");


    const handleChange = (event) =>{
        event.preventDefault();
        console.log(event.target.value)
    }
    // Dropdown button for choosing audit type
    const dropdownButton = (auditTypes) =>{
        
        
        
        const button = (auditTypes) =>{
            return(auditTypes.map((audit)=>{
                return(<option key={audit._id} value={audit._id}>{audit.name}</option>)
            }))
        }    
            // const button = (auditTypes) =>{
            //     return(
            //         auditTypes.auditTypes.map((audit) => {
            //             console.log(audit)
            //             return(<option key={audit.auditType} value={audit.auditType}>{audit.auditType}</option>)
            //         })
            //     )
            // }
            
        return(<Form><Form.Control as="select" defaultValue="OSHA" onChange={handleChange}>{button(auditTypes)}</Form.Control></Form>)
        // <DropdownButton as={ButtonGroup} title="Select Audit Type" id="bg-nested-dropdown" onChange={handleChange}>
        //     {auditTypes.map((auditType)=>{
        //         return(<Dropdown.Item key={auditType._id} value={auditType._id}>{auditType.name}</Dropdown.Item>)
        //     })}
        //     <Dropdown.Item key="newAuditType" value="newAuditType">New Audit Type</Dropdown.Item>
        // </DropdownButton>)
    }




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
                <Row className="justify-content-md-center" md="auto">
                    <h1>Create Audit Page</h1>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col md="auto">
                                Choose Audit Type:
                            </Col>
                            <Col md="auto">                                
                                {dropdownButton(data.auditTypes)}
                            </Col>                                
                        </Row>
                    </Col>                
                </Row>
            </Container>
        </main>
    );
};

export default CreateAudit;