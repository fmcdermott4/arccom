import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {READ_AUDIT_TYPES} from '../utils/queries';
import {CREATE_AUDIT_TO_CONDUCT} from '../utils/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory} from 'react-router-dom';

const CreateAudit = () => {
    const history = useHistory();
    const {loading, data} = useQuery(READ_AUDIT_TYPES);

    const [audit, setAuditType] = useState(
        {
            "name" : "",
            "auditType" : "",
            "questions" : [{answerGiven : "", comment: "", requirement : "", question: "", value: 0, correctAnswer:"", answers:["yes", "no", "n/a"]}]
        }
    );

    // Handle change function for create audit page
    const handleChange = (event) =>{
        event.preventDefault();
        setAuditType({
            ...audit,
            [event.target.name] : event.target.value
        })
    }

    // Dropdown button for choosing audit type
    const dropdownButton = (auditTypes) =>{
        const button = (auditTypes) =>{
            return(auditTypes.map((audit)=>{
                return(<option key={audit._id} value={audit._id}>{audit.name}</option>)
            }))
        }                
        return(<Form><Form.Control as="select" defaultValue="OSHA" name="auditType" onChange={handleChange}>{button(auditTypes)}<option key="newAuditType" value="newAuditType">New Audit Type</option></Form.Control></Form>)
    };

    // Add question to the page
    const addQuestion= () =>{
        const newQuestion = {requirement : "", question: "", value: 0, correctAnswer:"", answers:["yes", "no", "n/a"]};
        const index = audit.questions.length;
        audit.questions[index] = newQuestion;
        setAuditType({
            ...audit
        })   
    };

    // Add answer to question
    const addAnswer= (event) =>{
        // console.log(event.target.attributes[0].value)
        // console.log(audit.questions[event.target.attributes[0].value].answers)
        audit.questions[event.target.attributes[0].value].answers[audit.questions[event.target.attributes[0].value].answers.length] = "";
        setAuditType({
            ...audit
        })
    };

    // Updates form when questions on form are updated
    const updateQuestion = (event) =>{
        // index of array console.log(event.target.attributes[0].value)
        // index of question console.log(event.nativeEvent.path[2].attributes[0].value)
        // console.log(audit.questions[event.nativeEvent.path[2].attributes[0].value].answers[event.target.attributes[0].value])
        audit.questions[event.nativeEvent.path[2].attributes[0].value].answers[event.target.attributes[0].value] = event.target.value;
        setAuditType({
            ...audit
        })
    };

    // Updates form when form is filled out
    const handleQuestionChange = (event)=>{
        event.preventDefault();
        // console.log(event.target.attributes[0].value)
        // console.log(event.target.name)
        // console.log(event.target.value)
        switch (event.target.name){
            case "question":
                console.log("question");
                audit.questions[event.target.attributes[0].value].question = event.target.value;
                break;
            case "correctAnswer":
                audit.questions[event.target.attributes[0].value].correctAnswer = event.target.value;
                break;
            case "value":
                audit.questions[event.target.attributes[0].value].value = event.target.value;
                break;
            case "requirement":
                audit.questions[event.target.attributes[0].value].requirement = event.target.value;
                break;
            default: 
                console.log("No match");
        }
        
        setAuditType({
            ...audit
        })
    };

    const [createAuditToConduct, {error}] = useMutation(CREATE_AUDIT_TO_CONDUCT);

    const handleFormSubmit = async (event) =>{
        event.preventDefault();
        console.log(audit)
        // if(audit.name === ""){
        //     alert("Please give audit a name")
        // }
        // let dataCheck =true;
        // for(let i = 0; i<audit.questions.length; i++){
        //     if(audit.questions[i])
        // }
        if(audit.name !== "" && audit.auditType !== "" && audit.questions !== []){
            try{
                await createAuditToConduct({
                    variables: {...audit}
                }).then(alert("Successfully submitted")).then(history.push("/"))
            } catch(e){
                console.log(e)
            }
        }
        else{
            alert("Be sure to fill out required fields")
        }
    };

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
                        <Row>
                            <Col md="auto">
                                Audit Name:
                            </Col>
                            <Col>
                                <Form>
                                    <Form.Control name="name" type="text" onChange={handleChange} placeholder="Enter audit name"/> 
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                Choose Audit Type:
                            </Col>
                            <Col>                                
                                {dropdownButton(data.auditTypes)}
                            </Col>                                
                        </Row>
                    </Col>                
                </Row>
                <hr/>
                    <Form>
                        {audit.questions.map((audit, index)=>{
                            return(
                            <div key={index} index={index}>
                                <Form.Label>Question {index+1}</Form.Label>
                                <Row><Col xs={2}>Question</Col><Col xs={10}><Form.Control type="text" index={index} onChange={handleQuestionChange} name="question" placeholder="Enter your question here" /></Col></Row>
                                <Row><Col xs={2}>Correct Answer</Col><Col xs={10}><Form.Control type="text" index={index} onChange={handleQuestionChange} name="correctAnswer" placeholder="Enter the correct answer here" /></Col></Row>
                                <Row><Col xs={2}>Question Value</Col><Col xs={10}><Form.Control type="number" index={index} onChange={handleQuestionChange} name="value" placeholder="Question value, numbers only!" /></Col></Row>
                                <Row><Col xs={2}>Requirement</Col><Col xs={10}><Form.Control type="text" index={index} onChange={handleQuestionChange} name="requirement" placeholder="Enter requirement source, OSHA code or ARC policy, for example" /></Col></Row>
                                {audit.answers.map((answer, index)=>{
                                    return(<div>Possible answer {index+1}<Form.Control type="text" index={index} name="answer" placeholder={answer} onChange={updateQuestion} /></div>);
                                })}
                                <Button index={index} onClick={addAnswer}>Add Answer</Button>
                                <hr />
                            </div>)
                        })}
                    </Form>
                    <Row>
                        <Col>
                            <Button onClick={addQuestion}>Add Question</Button>
                        </Col>
                        <Col/>
                        <Col>
                            <Button onClick={handleFormSubmit}>Create Audit</Button>
                        </Col>
                        
                        
                    </Row>
            </Container>
        </main>
    )
};

export default CreateAudit;