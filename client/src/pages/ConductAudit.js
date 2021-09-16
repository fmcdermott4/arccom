import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import { useParams} from 'react-router-dom';
import {READ_AUDIT_TO_CONDUCT} from '../utils/queries';
import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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

const Audit = (data) => {
    let auditToConduct = data.data.auditToConduct;
    const myProfileId = Auth.getProfile().data._id;
    
    const now = () => {
        const right = (str, chr) =>{
            return( str.slice(str.length-chr, str.length))    
        }

        var today = new Date();
        var date = today.getFullYear()+'-'+right(("0"+(today.getMonth()+1)), 2)+'-'+ right(("0" + today.getDate()), 2);
        return(date)
    };
    let [audit, setAudit] = useState({
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
        console.log(audit)
    }
    return(
    <div>
        {
            auditToConduct.questions.map((question, index)=>{
                // console.log(question);
                return(
                    <div key={question._id}>
                        <hr/>
                        Question {index+1}:
                        <br/>
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
    </div>
    )
}

export default ConductAudit;