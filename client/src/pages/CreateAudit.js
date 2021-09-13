import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {READ_AUDIT_TYPES} from '../utils/queries'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const CreateAudit = () => {
    const {loading, error, data} = useQuery(READ_AUDIT_TYPES);


    const [audit, setAuditType] = useState(
        {
            "name" : "",
            "auditType" : "",
            "questions" : [{requirement : "", question: "", value: 0, correctAnswer:"", answers:["yes", "no", "n/a"]}]
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
    }
    const handleQuestionChange = (event)=>{
        event.preventDefault();
        // console.log(event.target.attributes[0].value)
        console.log(event.target.name)
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
            default: 
                console.log("No match");
        }
        
        setAuditType({
            ...audit
        })
        console.log(audit)
        // console.log(event.target.attribute.index.value);
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
                            <div key={index}>
                                <Form.Label>Question {index+1}</Form.Label>
                                <Form.Control type="text" index={index} onChange={handleQuestionChange} name="question" placeholder="Enter your question here" />
                                <Form.Control type="text" index={index} onChange={handleQuestionChange} name="correctAnswer" placeholder="Enter the correct answer here" />
                                <Form.Control type="number" index={index} onChange={handleQuestionChange} name="value" placeholder="Question value, numbers only!" />
                                <Form.Control type="text" index={index} onChange={handleQuestionChange} name="requirement" placeholder="Enter requirement source, OSHA code or ARC policy, for example" />
                                <hr />
                            </div>)
                        })}
                    </Form>
                    <Button onClick={addQuestion}>Add Question</Button>
            </Container>
        </main>
    );
};

export default CreateAudit;