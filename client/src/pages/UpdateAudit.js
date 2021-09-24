import React, {useState} from 'react';
import { useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {READ_AUDIT_TO_CONDUCT} from '../utils/queries';

const UpdateAudit = () => {
  const {auditId} = useParams();
  const { loading, data, error } = useQuery(READ_AUDIT_TO_CONDUCT, 
    {variables: 
        {"id": auditId},
    }
  );
  const[auditToUpdate, changeAuditToUpdate] = useState() 
  if(loading){
    return(<div>Loading...</div>)
  }
  return (
    <main>
      {console.log(data)}
      {auditId}
    </main>
  );
};

export default UpdateAudit;