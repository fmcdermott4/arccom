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
  // console.log(updatedAudit)
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

const addAnswer = (event) =>{
  
  const questionArrayIndex = event.target.parentElement.attributes[0].value;
  const auditToUpdate = JSON.parse(JSON.stringify(updatedAudit));
  auditToUpdate.questions[questionArrayIndex].answers.push("")
  setUpdatedAudit({
    ...auditToUpdate
  })
}

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
  if(name==="correctAnswer"){
    auditToUpdate.questions[index].correctAnswer = value;
  }
  if(name==="answer"){
    const answerArrayIndex = event.target.parentElement.parentElement.attributes[0].value;
    const questionArrayIndex = event.target.parentElement.parentElement.parentElement.attributes[0].value;
    // console.log(auditToUpdate)
    auditToUpdate.questions[questionArrayIndex].answers[answerArrayIndex] = value;
  }
  // auditToUpdate[index].name = value;
  setUpdatedAudit({
    ...auditToUpdate
  })
  // console.log(updatedAudit)
}
const deleteQuestion = (e) =>{
  const deleteIndex = e.target.parentElement.parentElement.parentElement.attributes[0].value;
  // console.log(e.target.parentElement.parentElement.parentElement.attributes[0].value)
  const auditToUpdate = JSON.parse(JSON.stringify(updatedAudit));
  auditToUpdate.questions.splice(deleteIndex,1)
  console.log(auditToUpdate);
  setUpdatedAudit({
    ...auditToUpdate
  })
  
  
}
const submitChanges = async (event) =>{
  
  event.preventDefault();

  
  const updatedAuditToSubmit = JSON.parse(JSON.stringify(updatedAudit));
  for(let i=0; i<updatedAuditToSubmit.questions.length; i++){
    delete updatedAuditToSubmit.questions[i].__typename;
  }
  try{
    await updateAuditToConduct({
      variables: {...updatedAuditToSubmit}
    }).then(alert("Successfully updated " + data.data.name + " to " + updatedAudit.name)).then(history.push("/audits/updateaudit"))
  }catch(e){
    console.log(e)
  }
}

return(
    <div>
      <h3>Make changes to {data.data.name} on this page</h3>
      <Form>
        <h5>Audit Name</h5>
          <Form.Control type="text" key="name" name="name" placeholder={updatedAudit.name} onChange={handleChange} />
        <br/> 
        <h5>Audit Type</h5>
          <AuditTypesButton />
          <br/>
          {updatedAudit.questions.map((question, index)=>{
            // console.log(question);
            return(
              <div key={index} id={index} onChange={updateQuestion}>
                <Row md="auto">
                  <Col md="auto">
                    <h5>Question {index+1}</h5>
                  </Col>
                  <Col md="auto">
                    <Button onClick={deleteQuestion} variant="danger">Delete Question {index+1}</Button>
                  </Col>
                </Row>
                <Row>
                  <Col md="auto">Question: </Col>
                  <Col><Form.Control as="textarea" name="question" id={index} placeholder={question.question} /></Col>
                </Row>
                <Row>
                  <Col md="auto">
                    Question value:
                  </Col>
                  <Col>
                    <Form.Control type="number" name="value" placeholder={question.value + " (numbers only)"} />
                  </Col>
                </Row>
                <Row>
                  <Col md="auto">
                    Correct answer:
                  </Col>
                  <Col>
                    <Form.Control type="text" name="correctAnswer" placeholder={question.correctAnswer} />
                  </Col>
                </Row>
                {question.answers.map((answer, index)=>{
                  return(
                    <Row id={index} >
                      <Col md="auto">
                        Answer {index+1}
                      </Col>
                      <Col>
                        <Form.Control name="answer" type="text" placeholder={answer} />
                      </Col>                      
                    </Row>
                    
                  )
                })}
                <Button onClick={addAnswer}>Add Answer</Button>
                <br/>
              </div>
            )
          })}
      </Form>
      <Row className="justify-content-md-center">
          <Col xs lg="2"/>
          <Col md="auto">
            <Button>Add Question</Button>
          </Col>
          <Col xs lg="2"/>
        </Row>      
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