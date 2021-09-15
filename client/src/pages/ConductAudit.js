import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import { useParams} from 'react-router-dom';
import {READ_AUDIT_TO_CONDUCT} from '../utils/queries';
import Auth from '../utils/auth'

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
    const auditToConduct = data.data.auditToConduct;
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
    console.log(audit);
    return(
    <div>
        {
            auditToConduct.questions.map((question)=>{
                console.log(question);
                return(
                    <div key={question._id}>
                        {question.question}
                    </div>)
            })
        }
    </div>
    )
}

export default ConductAudit;