import React from 'react';
import {useQuery} from '@apollo/client';
import { useParams} from 'react-router-dom';
import {READ_AUDIT_TO_CONDUCT} from '../utils/queries';

const ConductAudit = () =>{
    const {auditId} = useParams();
    const { loading, data, error } = useQuery(READ_AUDIT_TO_CONDUCT, 
        {variables: 
            {"id": auditId},
        }
    );
    const now = () => {
        const right = (str, chr) =>{
            return( str.slice(str.length-chr, str.length))    
        }

        var today = new Date();
        var date = today.getFullYear()+'-'+right(("0"+(today.getMonth()+1)), 2)+'-'+ right(("0" + today.getDate()), 2);
        return(date)
    }
    if(loading){
        return<div>Loading...</div>
    }    
    return(
        <div>
            {console.log(data)}
            {now()} {auditId}
        </div>
    )
}

export default ConductAudit;