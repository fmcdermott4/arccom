import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import { useParams} from 'react-router-dom';
import {READ_AUDIT_TO_CONDUCT, READ_FACILITIES} from '../utils/queries';
import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CREATE_CONDUCTED_AUDIT} from '../utils/mutations';
import Button from 'react-bootstrap/Button';
import { useHistory} from 'react-router-dom';

const ConductAudit = () =>{
        const {auditId} = useParams();
        const { loading, data, error } = useQuery(READ_AUDIT_TO_CONDUCT, 
        {variables: 
            {"id": auditId},
        }
    );    
    
    if(error){
        console.log(error)
    }
    if(loading){
        return<div>Loading...</div>
    }
    return(
        <div>
            <h1>{data.auditToConduct.name}</h1>
            <Audit data={data} />
        </div>
    )
}

const Audit = (auditData) => {
    const history = useHistory();
    const {data, loading} = useQuery(READ_FACILITIES);
    let auditToConduct = auditData.data.auditToConduct;
    const myProfileId = Auth.getProfile().data._id;
    
    const now = () => {
        const right = (str, chr) =>{
            return( str.slice(str.length-chr, str.length))    
        }

        var today = new Date();
        var date = today.getFullYear()+'-'+right(("0"+(today.getMonth()+1)), 2)+'-'+ right(("0" + today.getDate()), 2);
        return(date)
    };
    const [audit, setAudit] = useState({
        "name": auditToConduct.name,
        "conductedBy": myProfileId,
        "auditType": auditToConduct.auditType._id,
        "dateConducted": now(),
        "questions": auditToConduct.questions
    });

    const handleSelect = (event) => {
        event.preventDefault();
        const {value} = event.target;
        const index = event.nativeEvent.path[0].attributes.index.value;
        // audit.questions[index].answerGiven = value;
        // audit.questions[index].answerGiven = value;
        let auditToUpdate = JSON.parse(JSON.stringify(audit))
        auditToUpdate.questions[index].answerGiven = value;
        setAudit(
            auditToUpdate
        );
    }


    const handleComment = event =>{
        const index = event.nativeEvent.path[0].attributes.index.value;
        const {value} = event.target;
        let auditToUpdate = JSON.parse(JSON.stringify(audit))
        auditToUpdate.questions[index].comment = value;
        setAudit(
            auditToUpdate
        );
        
    };
    const updateFacility = (event)=>{
        
        setAudit({
            ...audit,
            "facility": event.target.value
        })
    }

    const [createConductedAudit] = useMutation(CREATE_CONDUCTED_AUDIT);
    
    const handleFormSubmit = async (event) =>{
        event.preventDefault();
        let dataCheck = true;
        for(let i=0; i<audit.questions.length; i++){
            delete audit.questions[i].__typename;
            if(!audit.questions[i].answerGiven){
                dataCheck = false;
            }
        }
        if(!audit.facility){
            dataCheck=false
        }
        if(dataCheck){
            try{
                await createConductedAudit({
                    variables: {...audit}
                }).then(alert("Successfully submitted")).then(history.push("/"))
            }catch(error){
                console.log(error)
            }
        }else(
            alert("Please ensure facility and questions are answered")
        )
        
    }
    if(loading){
        return<div>Loading...</div>
    }
    const sortedFacility = JSON.parse(JSON.stringify(data.facilities));
    sortedFacility.sort((a, b)=>(a.name>b.name)? 1: -1)
    return(
    <div>
        {   <Row>
                <Col md="auto" >
                Please select facility:
                </Col>
                <Col md="auto">
                <Form.Control as="select" name="facility" defaultValue="" onChange={updateFacility}>
                    <option disabled key="" value="">Select Answer</option>
                    {
                        sortedFacility.map((facility)=>{
                            return(
                                <option key={facility._id} value={facility._id}>{facility.name}</option>
                            )
                        })
                    }
                </Form.Control>
                </Col>
            </Row>
        }
        {
            auditToConduct.questions.map((question, index)=>{
                return(
                    <div key={question._id}>
                        <hr/>
                        <h5>Question {index+1}:</h5>
                        <Form.Label>
                            {question.question}
                        </Form.Label>
                        <Form.Group as={Row} key={question._id}>
                            <Form.Control as="select" name="answer" index={index} onChange={handleSelect} defaultValue="">
                                <option disabled key="" value="">Select Answer</option>
                                {question.answers.map((answer)=>{
                                    return(
                                        <option  key={answer} value={answer}>
                                            {answer}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                            <br/>
                            <Form.Control as="textarea" name="comment" index={index} onChange={handleComment} rows={3} placeholder="Comments..."/>
                        </Form.Group>
                        
                        
                        
                    </div>)
            })
        }
        <Button onClick={handleFormSubmit}>Submit Audit</Button>
    </div>
    )
}

export default ConductAudit;