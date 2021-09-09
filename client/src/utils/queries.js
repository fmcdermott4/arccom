import { gql } from '@apollo/client';

// Read queries
// 
// 
//
export const READ_ACCESS=gql`
    query access($id:ID){
        access(id:$id){
            _id
            level
        }
    }
`;
export const READ_ACCESSES = gql`
    query accesses{
        accesses{
            _id
            level
        }
    }
`;
export const READ_AUDIT_TYPE = gql`
    query auditType($id:ID){
        auditType(id:$id){
            _id
            name
        }
    }
`;
export const READ_AUDIT_TYPES = gql`
    query auditTypes{
        auditTypes{
            _id
            name
        }
    }
`;
export const READ_AUDIT_TO_CONDUCT = gql`
    query auditToConduct($id:ID){
        auditToConduct(id:$id){
            _id
            name
            auditType{
                _id
                name
            }
            questions{
                _id
                requirement
                question
                value
                correctAnswer
                answerGiven
                answers
            }        
        }
    }
`;
export const READ_AUDITS_TO_CONDUCT = gql`
    query auditsToConduct{
        auditsToConduct{
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
export const READ_AUDITS_TO_CONDUCT_BY_AUDIT_TYPE= gql`
    query auditsToConductByAuditType($auditType:ID){
        auditsToConductByAuditType(auditType:$auditType){
            _id
            name
            auditType{
                _id
                name
            }
            questions{
                _id
                requirement
                question
                value
                correctAnswer
                answerGiven
                answers
            }        
        }
    }
`;
export const READ_CONDUCTED_AUDIT = gql`
    query conductedAudit($id:ID){
        conductedAudit(id:$id){
            _id
            name
            conductedBy{
                _id
                name
                email
            }
            auditType{
                _id
                name
            }
            dateConducted
            questions{
                _id
                question
            }    
        }
    }
`;
export const READ_CONDUCTED_AUDITS = gql`
    query conductedAudits{
        conductedAudits{
            _id
            name
            conductedBy{
                _id
                name
                email
            }
            auditType{
                _id
                name
            }
            dateConducted
            questions{
                _id
                question
            }        
        }
    }
`;
export const READ_FACILITIES = gql`
    query facilities{
        facilities{
            _id
            name
        }
    }
`;
export const READ_FACILITY = gql`
    query facility($id:ID){
        facility(id:$id){
            _id
            name
        }
    }
`;
export const READ_PROFILES = gql`
    query profiles{
        profiles{
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
export const READ_PROFILE=gql`
    query profile($id: ID!){
        profile(id:$id){
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