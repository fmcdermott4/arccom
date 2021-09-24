import React, {useState } from 'react';
import {useQuery} from '@apollo/client';
import {READ_AUDIT_TYPES, READ_AUDITS_TO_CONDUCT_BY_AUDIT_TYPE} from '../utils/queries';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";


const SelectAuditToDelete = () => {
    
    const [auditType, setAuditType] = useState(null);

    const {loading, data} = useQuery(READ_AUDIT_TYPES);

    const handleSelect = async (event) => {
        event.preventDefault();
        const {value} = event.target;

        // console.log(name + " " + value)
        await setAuditType({
            auditType: value
        });
    }
    
    const auditTypeButton = (auditType) =>{        
        return(
            <Form>
                <Form.Group as={Row}>
                    <Form.Control as="select" onChange={handleSelect} defaultValue="">
                    <option disabled key="" value="">Select One</option>
                        {
                            auditType.map((audit)=>{
                                return(
                                    <option name={audit._id} key={audit.name} value={audit._id}>{audit.name}</option>
                                )
                            }) 
                        }                    
                    </Form.Control>
                </Form.Group>
            </Form>
        )
    }

    if(loading){
        return<div>Loading...</div>
    }
    return(
        <div>
            Select audit type {auditTypeButton(data.auditTypes)}
            {(auditType)?<SelectAuditFromTypes data={auditType} /> : <div />}
        </div>
    )
}

const SelectAuditFromTypes = (auditType) =>{
    const auditTypeId = auditType.data.auditType;
    const { loading, data, error } = useQuery(READ_AUDITS_TO_CONDUCT_BY_AUDIT_TYPE, 
        {variables: 
            {"auditType": auditTypeId},
        }
    );

    const [auditToConduct, setAuditToConduct] = useState("");
    
    const handleSelect = async (event) => {
        event.preventDefault();
        const {value} = event.target;
        await setAuditToConduct({
            auditToConduct: value
        });
    }

    if(loading){
        return<div>Loading...</div>
    }
    if(error || data.auditsToConductByAuditType.length === 0){
        return<div></div>
    }
    return(
        <Form>
            <Form.Label>Select Audit</Form.Label>
            <Form.Group as={Row}>
                <Form.Control as="select" onChange={handleSelect} defaultValue="">
                    <option disabled key="" value="">Select One</option>                        
                    {
                        data.auditsToConductByAuditType.map((audit)=>{
                            return(
                                <option name={audit._id} key={audit.name} value={audit._id}>{audit.name}</option>
                            )
                        }) 
                    }                    
                </Form.Control>
            </Form.Group>
            <br />
            <Row>                
                {(auditToConduct !== "")?<Button href={'/audits/updateaudit/' + auditToConduct.auditToConduct}>Update Audit</Button>:<div />}
            </Row>
        </Form>
    )
}

export default SelectAuditToDelete;