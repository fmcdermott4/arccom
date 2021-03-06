import React from 'react';
import { useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {READ_CONDUCTED_AUDIT} from '../utils/queries';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const IndividualAuditResults = () => {
    const {conductedAuditId} = useParams();

    const {loading, data, error} = useQuery(READ_CONDUCTED_AUDIT, 
            {
                variables: {id: conductedAuditId},
            }
        );
    const auditResult = (questions) =>{
        let numerator = 0;
        let denominator = 0;
                for(let i=0; i<questions.length; i++){
            if(questions[i].answerGiven.toLowerCase() === questions[i].correctAnswer.toLowerCase() && questions[i].answerGiven.toLowerCase() !== "n/a"){
                let value = parseInt(questions[i].value)
                numerator+= value
            }
            if(questions[i].answerGiven.toLowerCase() !== "n/a" && questions[i].correctAnswer.toLowerCase() !== "n/a"){
                let value = parseInt(questions[i].value)
                denominator+= value
            }
        }
        let fraction = numerator + " / " + denominator;
        return(fraction)
    }    
    if(loading){
        return<div>Loading...</div>
    }
    if(error){
        console.log(error)
    }
    return (
        <main>
            <div>
                <h5>
                    Facility: {data.conductedAudit.facility.name}  
                </h5>
                <h5>
                    Audit Type: {data.conductedAudit.auditType.name}
                </h5>
                <h5>
                    Audit Name: {data.conductedAudit.name}
                </h5>
                
                <h5>
                    Result: {auditResult(data.conductedAudit.questions)}
                </h5>
                <Row>
                    <Col md="auto">
                        <h5>Findings:</h5>
                    </Col>
                    <Col>
                        {
                            (data.conductedAudit.finding === "" || data.conductedAudit.finding === null)?<div>none</div> : <div>{data.conductedAudit.finding}</div>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        <h5>Discrepancies:</h5>
                    </Col>
                    <Col>
                        {
                            (data.conductedAudit.discrepancy === "" || data.conductedAudit.discrepancy === null)?<div>none</div> : <div>{data.conductedAudit.discrepancy}</div>
                        }
                    </Col>
                </Row>
                <h5>
                    Auditor: {data.conductedAudit.conductedBy.name}
                </h5>      
            </div>
            <hr/>
            <div>
                {data.conductedAudit.questions.map((question, index)=>{
                    return(
                        <div key={index}>
                            <Row>                            
                                Question {index + 1}: {question.question}                            
                            </Row>
                            <Row>
                                Result: {question.answerGiven}
                            </Row>
                            <Row>
                                Value: {auditResult([question])}
                            </Row>
                            {(question.requirement)?
                            <Row>
                                Requirement: {question.requirement}
                            </Row>:<div/>
                            }
                            {(question.comment)?
                                <Row>
                                    Comments: {question.comment}
                                </Row>:<div/>                                
                            }                            
                            
                            <hr/>
                        </div>
                    )
                })}
            </div>
        </main>
    );
};

export default IndividualAuditResults;