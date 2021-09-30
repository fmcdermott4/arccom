import React, {useState} from 'react';
import { useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {READ_AUDIT_TO_CONDUCT, READ_AUDIT_TYPES} from '../utils/queries';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {UPDATE_AUDIT_TO_CONDUCT} from '../utils/mutations';
import { useHistory} from 'react-router-dom';

const UpdateAudit = () => {
  const {auditId} = useParams();
  const { loading, data} = useQuery(READ_AUDIT_TO_CONDUCT, 
    {variables: 
        {"id": auditId},
    }
  );
  
  // const[auditToUpdate, changeAuditToUpdate] = useState() 
  
  if(loading){
    return(<div>Loading...</div>)
  }
  return (
    <div>
      <Audit data={data.auditToConduct} />
    </div>
  );
};

const Audit = (data)=>{
const [updatedAudit, setUpdatedAudit] =useState({name: data.data.name, id: data.data._id, auditType: data.data.auditType._id, questions: data.data.questions});  
const history = useHistory();
const handleChange = (event) =>{
  const {name, value} = event.target;
  setUpdatedAudit({
    ...updatedAudit,
    [name] : value
  })
  console.log(updatedAudit)
}

const AuditTypesButton = () =>{
  const{loading, data} = useQuery(READ_AUDIT_TYPES);
  
  
  
  if(loading){
    return(<div>Loading...</div>)
  }
  return(
    <Form.Control as="select" key="id" defaultValue={updatedAudit.auditType} name="auditType" placeholder={updatedAudit.auditType.name} onChange={handleChange}>
      {
        data.auditTypes.map((auditType)=>{
          return(
          <option value={auditType._id} key={auditType._id}>
            {auditType.name}
          </option>)
        })
      }
    </Form.Control>

  )
}
const [updateAuditToConduct] = useMutation(UPDATE_AUDIT_TO_CONDUCT);



const updateQuestion = (event)=>{
  const {name, value} = event.target;
  // console.log(event.target.parentElement.parentElement.parentElement.attributes[0].value)
  // console.log(name + " " + value);
  const index = event.target.parentElement.parentElement.parentElement.attributes[0].value;
  const auditToUpdate = JSON.parse(JSON.stringify(updatedAudit));
  if(name === "question"){
    auditToUpdate.questions[index].question = value;
    // console.log(index)
  }
  if(name==="value"){
    auditToUpdate.questions[index].value = value;
  }
  // auditToUpdate[index].name = value;
  console.log(auditToUpdate)
}

const submitChanges = async (event) =>{
  
  event.preventDefault();
  try{
    await updateAuditToConduct({
      variables: {...updatedAudit}
    }).then(alert("Successfully updated " + data.data.name + " to " + updatedAudit.name)).then(history.push("/audits/updateaudit"))
  }catch(e){
    console.log(e)
  }
}

return(
    <div>
      <h3>Make changes to {data.data.name} on this page</h3>
      <Form>
        <Form.Label>Audit Name</Form.Label>
          <Form.Control type="text" key="name" name="name" placeholder={updatedAudit.name} onChange={handleChange} /> 
        <Form.Label>Audit Type</Form.Label>
          <AuditTypesButton />
        
          {data.data.questions.map((question, index)=>{
            // console.log(question);
            return(
              <div key={index} id={index} onChange={updateQuestion}>
                <h4>Question {index+1}</h4>
                <Row>
                  <Col md="auto">Question: </Col>
                  <Col><Form.Control type="text" name="question" id={index} placeholder={data.data.questions[index].question} /></Col>
                </Row>
                <Row>
                  <Col md="auto">
                    Question value:
                  </Col>
                  <Col>
                    <Form.Control type="number" name="value" placeholder={data.data.questions[index].value + " (numbers only)"} />
                  </Col>
                </Row>
                <Row>
                  <Col md="auto">
                   Correct answer:
                  </Col>
                  <Col>
                    <Form.Control type="text" name="correctAnswer" placeholder={data.data.questions[index].correctAnswer} />
                  </Col>
                </Row>
              </div>
            )
          })}
      </Form>
      <hr/>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2"/>
          <Col md="auto">
            <Button onClick={submitChanges}>Submit changes</Button>
          </Col>
          <Col xs lg="2"/>
        </Row>
      </Container>
    </div>
  )
}

export default UpdateAudit;