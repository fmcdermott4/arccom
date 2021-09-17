import React, {useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {READ_CONDUCTED_AUDITS_FILTERED} from '../utils/queries'

const AuditResults = () => {

  const [getAudits, {data, loading, error}] = useLazyQuery(READ_CONDUCTED_AUDITS_FILTERED);
  const [filters, updateFilters] = useState({
    "facility" : "613a1745ddb5374e4481a5a9"
  });
  if(loading){
    return<div>Loading...</div>
  }
  return (
    <main>
      {console.log(data)}
      Hello Audit Results!
      <button onClick={()=>{getAudits({variables: filters}); updateFilters()}}>Click Me</button>
    </main>
  );
};

export default AuditResults;