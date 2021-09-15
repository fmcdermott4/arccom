import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {READ_AUDIT_TYPES, READ_AUDITS_TO_CONDUCT_BY_AUDIT_TYPE} from '../utils/queries';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const SelectAuditToConduct = () => {
    
    const [auditType, setAuditType] = useState("");

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
                    <Form.Control as="select" onChange={handleSelect}>
                        
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
             <SelectAuditFromTypes data={auditType} />
        </div>
    )
}

const SelectAuditFromTypes = (auditType) =>{
    console.log(auditType.data.auditType);
    const auditTypeId = auditType.data.auditType;
    // console.log(auditType.data.auditType);
    const { loading, data } = useQuery(READ_AUDITS_TO_CONDUCT_BY_AUDIT_TYPE, 
        {variables: 
            {"auditType": auditTypeId},
        }
    );

        
    
    if(loading){
        return<div>Loading...</div>
    }
    return(
        <Form>
            {console.log(data.auditsToConductByAuditType)}
            <Form.Label>Select Audit</Form.Label>
                <Form.Group as={Row}>
                    <Form.Control as="select" >                        
                        {
                            data.auditsToConductByAuditType.map((audit)=>{
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

export default SelectAuditToConduct;