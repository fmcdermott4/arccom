import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {READ_CONDUCTED_AUDITS_FILTERED, READ_FACILITIES, READ_AUDIT_TYPES} from '../utils/queries';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
// import { useTable } from 'react-table';



const AuditResults = () => {  

  const handleSelect = (event)=>{
    // console.log(event.target.value);
    const {name, value} = event.target;
    // console.log( name + " " + value);
    updateFilters({
      ...filters,
      [name]: value
    });
  };


  

  const [filters, updateFilters] = useState({});

  const FacilityDropdown = () =>{
    const {loading, data} = useQuery(READ_FACILITIES);
    if(loading){
      return(<div>Loading...</div>)
    } else{     
      return(
      <Form>
        <Form.Control as="select" name="facility" defaultValue="" onChange={handleSelect}>
        <option disabled key="" value="">Select Filter</option>
          {
            data.facilities.map((facility) =>{
              return(
                <option key={facility._id} value={facility._id}>{facility.name}</option>
              )
            })
          }
        </Form.Control>
      </Form>)
    }
  }

  const AuditTypesDropdown = () =>{
    const {loading, data} = useQuery(READ_AUDIT_TYPES);
    if(loading){
      return(<div>Loading...</div>)
    } else{
      
      return(
      <Form>
        {/* {console.log(data.auditTypes)} */}
        <Form.Control as="select" name="auditType" defaultValue="" onChange={handleSelect}>
        <option disabled key="" value="">Select Filter</option>
          {
            data.auditTypes.map((auditType=>{
              return(
                <option key={auditType._id} value={auditType._id}>{auditType.name}</option>
              )
            }))
          }
        </Form.Control>
      </Form>)
    }
  }
  const AuditNamesDropdown = () =>{
    const {data, loading} = useQuery(READ_CONDUCTED_AUDITS_FILTERED,
      {
        variables: filters,
      }
    );
    if(loading){
      return(<div>Loading...</div>)
    }else{
      let uniqueNames = [...new Map(data.conductedAuditsFiltered.map((el)=>[el["name"], el])).values()];
      uniqueNames.sort((a,b)=>(
        (a.name.toLowerCase() > b.name.toLowerCase())? 1: -1
      ))




      // conductedAuditsFiltered.sort((a,b)=>(
      //   (a.dateConducted > b.dateConducted)? 1:-1
      // )).reverse()
      return(
      <Form>
        {/* {console.log(data.auditTypes)} */}
        <Form.Control as="select" name="name" defaultValue="" onChange={handleSelect}>
        <option disabled key="" value="">Select Filter</option>
          {
            uniqueNames.map((auditType=>{
              return(
                <option key={auditType._id} value={auditType.name}>{auditType.name}</option>
              )
            }))
          }
        </Form.Control>
      </Form>)
    }
  }

  return (
    <main>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Facility</th>
            <th>Audit Type</th>
            <th>Audit Name</th>
            <th>Date Conducted</th>
            <th>Result</th>
          </tr>
          <tr>
              <th>
                <FacilityDropdown />
              </th>
              <th>
                <AuditTypesDropdown />
              </th>
              <th>
                <AuditNamesDropdown />
              </th>
            </tr>
        </thead>
        <TableBody filters={filters} />
      </Table>
      
      
      
    </main>
  );
};

const TableBody = (filters) =>{
  let filt = filters.filters;
  const {data, loading} = useQuery(READ_CONDUCTED_AUDITS_FILTERED,
      {
        variables: filt,
      }
    );

  const auditResult = (questions, id) =>{
    // console.log(questions)
    let numerator = 0;
    let denominator = 0;

    for(let i=0; i<questions.length; i++){
      if(questions[i].answerGiven === questions[i].correctAnswer && questions[i].answerGiven.toLowerCase() !== "n/a"){
        let value = parseInt(questions[i].value)
        numerator+= value
      }
      if(questions[i].answerGiven.toLowerCase() !== "n/a" && questions[i].correctAnswer.toLowerCase() !== "n/a"){
        let value = parseInt(questions[i].value)
        denominator+= value
      }
    }
    let fraction = numerator + " / " + denominator;
    return(<a href={"/audits/auditresults/" + id}>{fraction}</a>)
  }

  if(loading){
    return<tbody>Loading...</tbody>
  }
  
  let conductedAuditsFiltered = JSON.parse(JSON.stringify(data.conductedAuditsFiltered));
  conductedAuditsFiltered.sort((a,b)=>((a.dateConducted > b.dateConducted)? 1:-1)).reverse()
  
  return(    
      <tbody>{conductedAuditsFiltered.map((conductedAudit)=>{
        return(
          <tr key={conductedAudit._id}>
            <td>{conductedAudit.facility.name}</td>
            <td>{(conductedAudit.auditType !== null)? <div>{conductedAudit.auditType.name}</div> : <div>N/A</div>}</td>
            
            <td>{conductedAudit.name}</td>
            <td>{conductedAudit.dateConducted}</td>
            <td>{auditResult(conductedAudit.questions, conductedAudit._id)}</td>
            </tr>
        )
      })
    }</tbody>  
  )
}

export default AuditResults;