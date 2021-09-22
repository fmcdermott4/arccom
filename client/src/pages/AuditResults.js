import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {READ_CONDUCTED_AUDITS_FILTERED, READ_FACILITIES} from '../utils/queries';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';




const AuditResults = () => {
  
  
  
  
  return<div>Hello</div>
}

// const handleSelect = (event)=>{
//     console.log(event.target.name)
//   }


// const AuditResults = () => {

//   const {data, loading, refetch} = useQuery(READ_CONDUCTED_AUDITS_FILTERED);
//   const [filters, updateFilters] = useState({    
//   });

//   if(loading){
//     return<div>Loading...</div>
//   }
//   return (
//     <main>
//       {/* {console.log(data)} */}
//       {/* <Row><button onClick={()=>{getAudits(); updateFilters()}}>Click Me</button></Row> */}
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Facility</th>
//             <th>Audit Type</th>
//             <th>Date Conducted</th>
//             <th>Result</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <FacilitiesDropdown />
//             </td>
//           </tr>
//         </tbody>
//       </Table>
      
      
      
//     </main>
//   );
// };


// const FacilitiesDropdown = () =>{
//   const {loading, data} = useQuery(READ_FACILITIES);

//   if(loading){
//     return<div>Loading...</div>
//   }
//   return(
//     <Form name="facility" onChange={handleSelect} >
//       <Form.Control as="select" name = "facility">
//         {/* {console.log(data)} */}
//         {data.facilities.map((facility)=>{
//           // console.log(facility);
//           return(<option key={facility._id} value={facility._id}>{facility.name}</option>)
//         })}
//       </Form.Control>
//     </Form>
//   )
// }
export default AuditResults;