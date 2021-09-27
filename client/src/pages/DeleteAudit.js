import React, {useState } from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {READ_AUDIT_TYPES, READ_AUDITS_TO_CONDUCT_BY_AUDIT_TYPE} from '../utils/queries';
import {DELETE_AUDIT_TO_CONDUCT, DELETE_AUDIT_TYPE} from '../utils/mutations';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import { useHistory} from 'react-router-dom';


const DeleteAudit = () => {
    
    const [auditType, setAuditType] = useState(null);

    const {loading, data} = useQuery(READ_AUDIT_TYPES);

    const handleSelect = async (event) => {
        event.preventDefault();
        const {value} = event.target;

        // console.log(event.target.selectedOptions[0].attributes.name.value)
        await setAuditType({
            auditType: value,
            name: event.target.selectedOptions[0].attributes.name.value
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
                                    <option name={audit.name} key={audit.name} value={audit._id}>{audit.name}</option>
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
            {(auditType)?<SelectAuditFromTypes data={auditType} /> : <div/>}
        </div>
    )
}

const SelectAuditFromTypes = (auditType) =>{
    const auditTypeId = auditType.data.auditType;
    const history = useHistory();
    const { loading, data, error } = useQuery(READ_AUDITS_TO_CONDUCT_BY_AUDIT_TYPE, 
        {variables: 
            {"auditType": auditTypeId},
        }
    );
    const [deleteConductedAudit] = useMutation(DELETE_AUDIT_TO_CONDUCT);
    const [auditToConduct, setAuditToConduct] = useState("");
    
    const handleSelect = async (event) => {
        event.preventDefault();
        // console.log(event.nativeEvent.path[0].attributes[0].ownerElement[1].attributes.name.value);
        // console.log(event.target.selectedOptions[0].attributes.name.value);
        const {value} = event.target;
        await setAuditToConduct({
            auditToConduct: value,
            name: event.target.selectedOptions[0].attributes.name.value
        });
    }

    const [auditToDelete, setAuditToDelete] = useState("");
    
    const deleteAudit = (event) => {
      event.preventDefault();
      try{
        deleteConductedAudit({
          variables: {id: auditToDelete.id}
        }).then(alert(auditToDelete.name + " deleted")).then(history.push("/"))
      }catch(e){
        console.log(e)
      }
    }

    const [deleteAuditTypeMutation] = useMutation(DELETE_AUDIT_TYPE);

    const deleteAuditType = (event) =>{
      event.preventDefault();
      console.log("I'll try");
      console.log(auditType.data.auditType)
      try{
        deleteAuditTypeMutation({
          variables: {id: auditType.data.auditType}
        }).then(alert(auditType.data.name + " deleted")).then(history.push("/"))
      }catch(e){
        console.log(e)
      }

    }
    const handleDeleteText = (event) =>{
      setAuditToDelete({
        name: event.target.value,
        id: event.target.id
      })
    }
    const [auditTypeToDelete, setAuditTypeToDelete] = useState("");

    const handleDeleteAuditTypeText = (event) =>{
      // console.log(event.target.value);
      setAuditTypeToDelete({
        name: event.target.value
      })
    }

    if(loading){
        return<div>Loading...</div>
    }
    if(error || data.auditsToConductByAuditType.length === 0){
        return(
          <Row>
              <Col md="auto">
                <Form.Label>Type audit type to delete here</Form.Label>
              </Col>
              <Col>
                <Form.Control md="auto" name={auditType.data.name} onChange={handleDeleteAuditTypeText} input="text" placeholder={"Type " + auditType.data.name + " here"}></Form.Control>
              <Form.Text>
                **This will delete the audit type and all the associated audits**
              </Form.Text>

              </Col>
              <Col>
                {(auditType.data.name === auditTypeToDelete.name)? <Button onClick={deleteAuditType}>Click me to delete {auditType.data.name}</Button>:<div />}
              </Col>
            </Row>
        )
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
                                <option name={audit.name} key={audit.name} value={audit._id}>{audit.name}</option>
                            )
                        }) 
                    }                    
                </Form.Control>
            </Form.Group>
            <br />
            <Row>                
                {(auditToConduct !== "")?
                  <Row>
                    <Col md="auto">
                      <Form.Label>Type audit to delete here</Form.Label>  
                    </Col>
                    <Col>
                      <Form.Control md="auto" input="text" onChange={handleDeleteText} id={auditToConduct.auditToConduct} placeholder={"Type " + auditToConduct.name + " here"} />
                    </Col>
                    <Col>                    
                      {(auditToDelete.name === auditToConduct.name)? <Button onClick={deleteAudit}>Click me to delete {auditToConduct.name}</Button>:<div/>}
                    </Col>
                  </Row>
                
                :<div />}
            </Row>
            <br/>
            <Row>
              <Col md="auto">
                <Form.Label>Type audit type to delete here</Form.Label>
              </Col>
              <Col>
                <Form.Control md="auto" name={auditType.data.name} onChange={handleDeleteAuditTypeText} input="text" placeholder={"Type " + auditType.data.name + " here"}></Form.Control>
              <Form.Text>
                **This will delete the audit type and all the associated audits**
              </Form.Text>

              </Col>
              <Col>
                {(auditType.data.name === auditTypeToDelete.name)? <Button onClick={deleteAuditType}>Click me to delete {auditType.data.name}</Button>:<div />}
              </Col>
            </Row>
        </Form>
    )
}

export default DeleteAudit;