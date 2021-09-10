import { gql } from '@apollo/client';

// CREATE Mutations
// CREATE Mutations
// CREATE Mutations
// CREATE Mutations
// CREATE Mutations
// CREATE Mutations
export const CREATE_ACCESS = gql`
    mutation createAccess($level:String){
        createAccess(level:$level){
            _id
            level
        }
    }
`;
export const CREATE_AUDIT_TO_CONDUCT = gql`
    mutation createAuditToConduct($name:String!, $auditType:ID!){
        createAuditToConduct(name:$name, auditType:$auditType){
            _id
            name
            auditType{
                _id
            }
        }
    }
`;
export const CREATE_AUDIT_TYPE = gql`
    mutation createAuditType($name:String){
        createAuditType(name:$name){
            _id
            name
        }
    }
`;
export const CREATE_CONDUCTED_AUDIT = gql`
    mutation createConductedAudit($name:String, $conductedBy:ID, $auditType:ID, $dateConducted:String, $questions:[AnsweredQuestion]){
        createConductedAudit(name:$name, conductedBy:$conductedBy, auditType:$auditType, dateConducted:$dateConducted, questions:$questions){
            name
            conductedBy{
                _id
                name
            }
            auditType{
                _id
                name
            }
            dateConducted
            questions{
                _id
            }
        }
    }
`;
export const CREATE_FACILITY = gql`
    mutation createFacility($name:String){
        createFacility(name:$name){
            _id
            name
        }
    }
`;
export const CREATE_PROFILE = gql`
    mutation createProfile($name:String!, $email:String!, $password:String!){
        createProfile(name:$name, email:$email, password:$password){
        token
        profile{
            _id
            name
            email
            password
            access{
                _id
                level
            }
            active
        }
        }
    }
`;
export const LOGIN_USER = gql`
  mutation login($email:String!, $password:String!) {
    login(email:$email, password:$password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;
// UPDATE Mutations
// UPDATE Mutations
// UPDATE Mutations
// UPDATE Mutations
// UPDATE Mutations
// UPDATE Mutations
export const UPDATE_ACCESS = gql`
    mutation updateAccess($id:ID, $level:String){
        updateAccess(id:$id, level:$level){
            _id
            level
        }
    }
`;
export const UPDATE_AUDIT_TO_CONDUCT=gql`
    mutation updateAuditToConduct($id:ID, $name:String, $auditType:ID){
        updateAuditToConduct(id:$id, name:$name, auditType:$auditType){
            _id
            name
            auditType{
                _id
                name
            }
            questions{
                _id
            }
        }
    }
`;
export const UPDATE_AUDIT_TYPE=gql`
    mutation updateAuditType($id:ID, $name:String){
        updateAuditType(id:$id, name:$name){
            _id
            name
        }
    }
`;
export const UPDATE_CONDUCTED_AUDIT=gql`
    mutation updateConductedAudit($id:ID, $name:String, $conductedBy:ID, $auditType:ID, $dateConducted:String, $questions:[AnsweredQuestion]){
        updateConductedAudit(id: $id, name: $name, conductedBy: $conductedBy, auditType: $auditType, dateConducted: $dateConducted, questions:$questions){
            _id
            name
            conductedBy{
                _id
                name
            }
            auditType{
                _id
                name
            }
            dateConducted
            questions{
                _id
                requirement
                question
            }        
        }
    }
`;
export const UPDATE_FACILITY=gql`
    mutation updateFacility($id:ID, $name:String){
        updateFacility(id:$id, name:$name){
            _id
            name
        }
    }
`;
export const UPDATE_PROFILE=gql`
    mutation updateProfile($id:ID, $name:String, $email:String, $password:String, $access:ID, $active:Boolean){
        updateProfile(id:$id, name:$name, email:$email, password:$password, access:$access, active:$active){
            _id
            name
            email
            password
            access{
                _id
                level
            }
            active
        }
    }
`;
// DELETE Mutations
// DELETE Mutations
// DELETE Mutations
// DELETE Mutations
// DELETE Mutations
// DELETE Mutations
export const DELETE_ACCESS=gql`
    mutation deleteAccess($id:ID){
        deleteAccess(id:$id){
            _id
            level
        }
    }
`;
export const DELETE_AUDIT_TO_CONDUCT=gql`
    mutation deleteAuditToConduct($id:ID){
        deleteAuditToConduct(id:$id){
            _id
            name
            auditType{
                _id
                name
            }
        }
    }
`;
export const DELETE_AUDIT_TYPE=gql`
    mutation deleteAuditType($id:ID){
        deleteAuditType(id:$id){
            _id
            name
        }
    }
`;
export const DELETE_FACILITY=gql`
    mutation deleteFacility($id:ID){
        deleteFacility(id:$id){
            _id
            name
        }
    }
`;
export const DELETE_CONDUCTED_AUDIT=gql`
    mutation deleteConductedAudit($id:ID){
        deleteConductedAudit(id:$id){
            _id
            name
        }
    }
`;
export const DELETE_PROFILE=gql`
    mutation deleteProfile($id:ID){
        deleteProfile(id:$id){
            _id
            name
            email
        }
    }
`;