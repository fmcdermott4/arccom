import React from 'react';
// import { useParams } from 'react-router-dom';

const ConductAudit = () =>{
    const now = () => {
        const right = (str, chr) =>{
            return( str.slice(str.length-chr, str.length))    
        }

        var today = new Date();
        var date = today.getFullYear()+'-'+right(("0"+(today.getMonth()+1)), 2)+'-'+ right(("0" + today.getDate()), 2);
        return(date)
    }

    return<div>{now()}</div>
}

export default ConductAudit;